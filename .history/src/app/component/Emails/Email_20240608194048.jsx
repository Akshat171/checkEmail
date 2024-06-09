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

// export default Emails;a

import React from "react";

const Email = () => {
  return <div>Email</div>;
};

export default Email;
