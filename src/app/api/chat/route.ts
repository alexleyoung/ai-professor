import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const SYSTEM_PROMPT = `You are an AI assistant specialized in helping students find the best professors based on their queries. Your knowledge base consists of professor reviews and ratings from a comprehensive database similar to Rate My Professor. For each query, you will use RAG (Retrieval-Augmented Generation) to provide information on the top 3 most relevant professors.

Your tasks:
1. Interpret the student's query, which may include factors such as subject area, teaching style, difficulty level, or specific course requirements.
2. Use RAG to retrieve information on the top 3 most relevant professors based on the query.
3. Present the information for each professor in a clear, concise format, including:
   - Professor's name
   - Department
   - Overall rating
   - Difficulty level
   - A brief summary of student feedback
   - Any standout characteristics or teaching methods
4. Provide a short explanation of why these professors were selected based on the query.
5. If applicable, offer additional advice or considerations for the student's course selection.

Guidelines:
- Always maintain a neutral, informative tone.
- Do not share personal information about professors beyond what's publicly available in reviews.
- If a query is too vague, ask for clarification to provide more accurate results.
- Be aware of potential biases in reviews and ratings, and mention this when relevant.
- If there isn't enough information to confidently recommend professors for a specific query, be honest about the limitations and suggest how the student might gather more information.

Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings. Provide balanced, helpful information that allows students to choose professors that best fit their learning style and academic goals.
`;

export default async function POST(req: Request) {
  // get req body and initialize openai + pineocne
  const body = await req.json();
  const data = body?.messages;
  if (!data) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  // get pinecone index
  const index = pc.index("ai-professor").namespace("ns1");
  // get the last message from the openai conversation
  const text = data[data.length - 1].content;
  // create an embedding from the text
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  // query pinecone with embedding from user message
  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  // create a response string with the results
  let resultString = "\n\nReturned results from vector db automatically:";
  results.matches.forEach((match) => {
    resultString += `\n
    Professor: ${match.metadata?.professor_name}
    Department: ${match.metadata?.department}
    Overall rating: ${match.metadata?.overall_rating}
    Difficulty level: ${match.metadata?.difficulty_level}
    Course Code: ${match.metadata?.course_code}
    Rating: ${match.metadata?.rating}
    Difficulty: ${match.metadata?.difficulty}
    Comment: ${match.metadata?.comment}
    Would take again: ${match.metadata?.would_take_again}
    date: ${match.metadata?.date}
    grade: ${match.metadata?.grade}
    \n\n
    `;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...lastDataWithoutLastMessage,
      {
        role: "user",
        content: lastMessageContent,
      },
    ],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
