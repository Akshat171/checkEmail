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
  const [emailCount, setEmailCount] = useState(10);
  // const [apiKey, setApiKey] = useState("");

  const apiKey = "AIzaSyC_jVHQEg6yS7H_SoHIvXq4_SxyqyZr5KA";

  const handleEmailCountChange = (e) => {
    setEmailCount(Number(e.target.value)); // Convert selected value to number
  };

  const handleClarify = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/classify-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails,
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to classify emails");
      }

      const data = await response.json();
      console.log(data);

      const updateEmails = emails.map((email, index) => ({
        ...email,
        classification: data[index],
      }));
      setEmails(updateEmails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          selector: emailCount,
          refreshToken:
            "1//04KsrZ9rYA3k9CgYIARAAGAQSNwF-L9Irp7gXhNsBG5ws93SPppHc3cQxYjhGfxB7CVuDkaZsTfb5ko0EMYiQw1RQud_Y-hht5pU",
          accessToken:
            "ya29.a0AXooCgtPXCPirII56YXCI9tT3cDHeBOI1V4xXcPEC3tGNIvXdudwHFvH0cTUnAUNzaKvtgkssg-TZt9IX8Zzjb85AF4EraErfqI3ryosA69o55y-l2Wk6-g7EuR9KPYUnAvIyUFn19gQDkJNTXhMql8Ep2z-FkcJuDcJaCgYKAeMSARMSFQHGX2MilmOQQf3y-ACC4p2rwgsIVw0171",
        }),
      });
      console.log("email count", emailCount);

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      console.log(data);
      setEmails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emails</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={emailCount} // Set the selected value from state
            onChange={handleEmailCountChange} // Handle change to update state
            className="mr-4 p-1 text-sm border rounded text-black"
          >
            {[...Array(20).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={fetchEmails}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Loading..." : "Fetch Emails"}
          </button>
        </div>
        <button
          onClick={handleClarify}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
        >
          {loading ? "Clarifying..." : "Clarify"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ul className="space-y-4 mt-4">
        {emails.map((email) => (
          <li key={email.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold text-lg mb-2 text-black">
              <span className="text-gray-600">From:</span>
              {
                email.payload.headers.find((header) => header.name === "From")
                  ?.value
              }
            </p>
            <p className="font-semibold mb-2 text-black">
              <span className="text-gray-600">Subject:</span>
              {
                email.payload.headers.find(
                  (header) => header.name === "Subject"
                )?.value
              }
            </p>
            <p className="text-gray-700">
              <span className="text-gray-600">Snippet:</span> {email.snippet}
            </p>
            {email.classification && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Classification:</span>{" "}
                {email.classification}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
