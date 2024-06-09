import { google } from "googleapis";
import { NextResponse } from "next/server";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

async function fetchEmails(accessToken, refreshToken, maxResults) {
  oAuth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: Number(maxResults),
    });
    const messages = response.data.messages;

    const emailPromises = messages.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      return email.data;
    });
    return Promise.all(emailPromises);
  } catch (error) {
    console.error("Error fetching emails: ", error);
    throw error;
  }
}

export async function POST(request) {
  const { accessToken, refreshToken } = await request.json();

  try {
    const emails = await fetchEmails(accessToken, refreshToken);
    return NextResponse.json(emails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
