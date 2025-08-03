// app/api/ask/route.ts
import { NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const result = await callGroq(messages);
    console.log("AI Response:", result);
    return NextResponse.json({ result });
  } catch (err: any) {
    console.error("API route error:", err);

    // Handle specific error cases
    if (err.message.includes("GROQ_API_KEY")) {
      return NextResponse.json(
        {
          error: "API configuration error. Please check environment variables.",
        },
        { status: 500 }
      );
    }

    if (err.message.includes("Groq API request failed")) {
      return NextResponse.json(
        { error: "External API error. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
