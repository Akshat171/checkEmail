import { NextResponse } from "next/server";

export async function POST(request) {
  const { emails, apiKey } = await request.json();

  try {
    const classifications = await classifyEmails(emails, apiKey);
    return NextResponse.json(classifications);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to clarify emails",
      },
      {
        status: 500,
      }
    );
  }
}

async function classifyEmails(emails, apiKey) {
  const classificationPromises = emails.map(async (email) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",

          data: {},
        }
      );
    } catch (error) {
      console.error("Error classifying email:", error.message);
      return "unknown";
    }
  });
}
