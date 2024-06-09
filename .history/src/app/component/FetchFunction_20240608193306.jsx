// // component/FetchFunction.js
// import { google } from "googleapis";

// async function FetchEmails(email, accessToken) {
//   const auth = new google.auth.OAuth2();
//   auth.setCredentials({ access_token: accessToken });

//   const gmail = google.gmail({ version: "v1", auth });

//   try {
//     const response = await gmail.users.messages.list({ userId: "me" });
//     console.log(response.data.messages);
//     return response.data.messages;
//   } catch (error) {
//     console.error("Error fetching emails: ", error);
//     throw error;
//   }
// }

// export default FetchEmails;

// import { google } from "googleapis";

// async function FetchEmails(email) {
//   const auth = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_CLIENT_ID
//   );
//   auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

//   const gmail = google.gmail({ version: "v1", auth });

//   try {
//     //   const url = `https://gmail.googleapis.com/gmail/v1/users/${re}`
//     const response = await gmail.users.messages.list({ userId: "me" });

//     return response.data.messages;
//   } catch (error) {
//     console.error("Error fetching emails: ", error);
//     throw error;
//   }
// }

// export default FetchEmails;

// import { google } from "googleapis";

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// oAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// async function fetchEmails(accessToken) {
//   oAuth2Client.setCredentials({ access_token: accessToken });

//   const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

//   try {
//     const response = await gmail.users.messages.list({
//       userId: "me",
//       maxResults: 10,
//     });
//     console.log(response.data.messages);
//     const messages = response.data.messages;

//     const emailPromises = messages.map(async (message) => {
//       const email = await gmail.users.messages.get({
//         userId: "me",
//         id: message.id,
//       });
//       console.log(email.data);
//       return email.data;
//     });
//     return Promise.all(emailPromises);
//   } catch (error) {
//     console.error("Error fetching emails: ", error);
//     throw error;
//   }
// }

// export default fetchEmails;

const fetchEmails = async (accessToken) => {
  try {
    const response = await fetch(`/api/fetchemails?accessToken=${accessToken}`);
    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }
    const emails = await response.json();
    return emails;
  } catch (error) {
    console.error("Error fetching emails: ", error);
    throw error;
  }
};

export default fetchEmails;
