// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FetchEmails from "../../../component/FetchFunction";

// const credentials = {
//   accessToken: process.env.ACCESS_TOKEN,
// };

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email }) {
//       if (account.provider === "google") {
//         try {
//           console.log("Hello");
//           const emails = await FetchEmails(user.email, account.access_token);
//           console.log(emails);
//         } catch (error) {
//           console.log("Error fetching emails: ", error);
//         }
//       }
//     },
//     async jwt({ token, account }) {
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//   },
// });

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FetchEmails from "../../../component/FetchFunction";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           scope:
//             "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email }) {
//       if (account.provider === "google") {
//         try {
//           // Ensure accessToken is passed to FetchEmails function
//           const emails = await FetchEmails(user.email);
//           console.log(emails);
//         } catch (error) {
//           console.log("Error fetching emails: ", error);
//         }
//       }
//       return true; // Returning true to indicate successful sign-in
//     },
//     async jwt({ token, account }) {
//       // Store access token in JWT token
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Pass access token to session
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken;
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import fetchEmails from "../../../component/FetchFunction";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };

// callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         try {
//           // Fetch emails using the access token
//           const emails = await fetchEmails(
//             account.access_token,
//             account.refresh_token
//           );
//           console.log(emails);
//         } catch (error) {
//           console.log("Error fetching emails: ", error);
//         }
//       }
//       return true; // Returning true to indicate successful sign-in
//     },
//     async jwt({ token, account }) {
//       // Store access token in JWT token
//       if (account?.accessToken) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Pass access token to session
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken;
//       }
//       return session;
//     },
//   },
