// import { useEffect, useState } from "react";
// import fetchEmails from "../FetchFunction";
// import Image from "next/image";

// const Emails = ({ accessToken }) => {
//   const [emails, setEmails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const emailData = await fetchEmails(accessToken);
//         setEmails(emailData);
//       } catch (error) {
//         console.error("Error fetching emails:", error);
//       }
//     };

//     fetchData();
//   }, [accessToken]);

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

//   return (
//     <div>
//       {emails.map((email) => {
//         const { senderName, senderEmail, subject, snippet } =
//           extractEmailData(email);
//         return (
//           <div key={email.id} style={{ margin: "1rem", padding: "1rem" }}>
//             <div>
//               <Image
//                 alt={senderName}
//                 src={`https://www.gravatar.com/avatar/${senderEmail}?d=identicon`}
//                 width={20}
//                 height={20}
//               />
//               <p>{senderName}</p>
//               <p>{subject}</p>
//               <p>{snippet}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Emails;

import React from "react";

const Email = () => {
  return <div>Email</div>;
};

export default Email;
