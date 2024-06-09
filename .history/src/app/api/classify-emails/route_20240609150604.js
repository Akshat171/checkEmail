import { NextResponse } from "next/server";

export async function POST(request) {
  const { emails, apiKey } = await request.json();
  console.log(emails, apiKey);

  try {
    console.log("classifyEmail start");
    const classifications = await classifyEmails(emails, apiKey);
    console.log("classifyEmail response", classifications);

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You will be provided with an email snippet, and your task is to classify in one word its category as spam, promotion, important, or marketing.\n\nEmail content:\n${email.snippet}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to classify email");
      }

      const data = await response.json();
      const classification =
        data.content[0]?.parts[0]?.text.trim() || "unknown";
      console.log("classification", classification);

      return {
        email: email,
        classification: classification, // Adjust this line based on the actual response structure
      };
    } catch (error) {
      console.error("Error classifying email:", error.message);
      return "unknown";
    }
  });
  return Promise.all(classificationPromises);
}
