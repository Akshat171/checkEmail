// import { useEffect, useState } from "react";
// import fetchEmails from "../FetchFunction";
// import { useSession } from "next-auth/react";

// const Emails = () => {
//   const { data: session } = useSession();
//   const [emails, setEmails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (session?.accessToken) {
//         try {
//           const emailData = await fetchEmails(session.accessToken);
//           setEmails(emailData);
//         } catch (error) {
//           console.error("Error fetching emails:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [session?.accessToken]);

//   const extractEmailData = (email) => {
//     const headers = email.payload.headers;
//     const fromHeader = headers.find((header) => header.name === "From");
//     const subjectHeader = headers.find((header) => header.name === "Subject");

//     const from = fromHeader ? fromHeader.value : "Unknown Sender";
//     const subject = subjectHeader ? subjectHeader.value : "No Subject";

//     const fromMatch = from.match(/(.*) <(.*)>/);
//     const senderName = fromMatch ? fromMatch[1] : from;
//     const senderEmail = fromMatch ? fromMatch[2] : from;

//     return { senderName, senderEmail, subject, snippet: email.snippet };
//   };

//   return <div>Hello</div>;
// };

// export default Emails;

// // import React from "react";

// // const Email = () => {
// //   return <div>Email</div>;
// // };

// // export default Email;

"use client";

import { useState } from "react";

export default function Emails() {
  console.log("in emails file");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: process.env.ACCESS_TOKEN,
          refreshToken: process.env.REFRESH_TOKEN,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      setEmails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Emails</h1>
      <button onClick={fetchEmails} disabled={loading}>
        {loading ? "Loading..." : "Fetch Emails"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <p>
              <strong>From:</strong>{" "}
              {
                email.payload.headers.find((header) => header.name === "From")
                  ?.value
              }
            </p>
            <p>
              <strong>Subject:</strong>{" "}
              {
                email.payload.headers.find(
                  (header) => header.name === "Subject"
                )?.value
              }
            </p>
            <p>
              <strong>Snippet:</strong> {email.snippet}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
