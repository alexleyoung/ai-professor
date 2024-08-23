import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// check text for inappropriate content
export async function POST(req: Request) {
  const body = await req.json();
  const data = body?.message;

  if (!data) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const response = await openai.moderations.create({
    model: "text-moderation-stable",
    input: data,
  });

  if (!response) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return NextResponse.json(
    {
      flagged: response.results[0].flagged,
    },
    { status: 200 }
  );
}
