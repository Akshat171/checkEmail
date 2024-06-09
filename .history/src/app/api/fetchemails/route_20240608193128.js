// /pages/api/fetchEmails.js

import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req, res) {
  console.log(req.query);
  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  oAuth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });
    const messages = response.data.messages;

    const emailPromises = messages.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      return email.data;
    });

    const emails = await Promise.all(emailPromises);
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails: ", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
}
