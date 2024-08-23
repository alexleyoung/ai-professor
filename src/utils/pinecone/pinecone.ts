import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const index = pc.index("ai-professor");

export async function embedReview(review: Review) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: review.comment,
  });

  function removeNullValues<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    for (const key in obj) {
      if (obj[key] !== null) {
        result[key] = obj[key];
      }
    }

    return result;
  }
  const filteredReview = removeNullValues(review);

  const data = [
    {
      id: String(review.id),
      values: embedding.data[0].embedding,
      metadata: filteredReview,
    },
  ];
  await index.namespace("ns1").upsert(data);
}

export async function deleteReviewEmbedding(reviewId: string) {
  await index.namespace("ns1").deleteOne(reviewId);
}
