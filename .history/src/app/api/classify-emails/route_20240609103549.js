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
    } catch (error) {
      console.error("Error classifying email:", error.message);
      return "unknown";
    }
  });
}
