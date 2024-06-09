"use client";

import { useEffect, useState } from "react";
import { useApiKey } from "../../../context/ApiKeyContext";

export default function Emails() {
  console.log("in emails file");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailCount, setEmailCount] = useState(10);
  const [selectedEmail, setSelectedEmail] = useState(null);
  // const [apiKey, setApiKey] = useState("");

  // const apiKey = "AIzaSyC_jVHQEg6yS7H_SoHIvXq4_SxyqyZr5KA";

  const handleEmailCountChange = (e) => {
    setEmailCount(Number(e.target.value)); // Convert selected value to number
  };

  const handleClarify = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = localStorage.getItem("apiKey");
      if (!apiKey) {
        throw new Error("API Key not found in localStorage.");
      }
      console.log(apiKey);
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
      // console.log(data);

      const updateEmails = emails.map((email, index) => ({
        ...email,
        classification: data[index]?.classification,
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
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

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

  const getClassificationColor = (classification) => {
    switch (classification) {
      case "Marketing":
        return "text-blue-600";
      case "Spam":
        return "text-red-600";
      case "Important":
        return "text-yellow-600";
      case "Promotion":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const openDrawer = (email) => {
    setSelectedEmail(email);
  };

  const closeDrawer = () => {
    setSelectedEmail(null);
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
            <div
              onClick={() => openDrawer(email)}
              className="cursor-pointer hover:bg-gray-100 transition duration-200"
            >
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
                <p className={`text-sm mt-2 font-bold text-black`}>
                  Classification:{" "}
                  <span
                    className={`${getClassificationColor(
                      email.classification
                    )}`}
                  >
                    {email.classification}
                  </span>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedEmail && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 transition-transform duration-300 transform translate-x-0">
            <div className="p-6">
              <button
                onClick={handleCloseDrawer}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <h2 className="text-xl font-bold mb-4">
                {
                  selectedEmail.payload.headers.find(
                    (header) => header.name === "Subject"
                  )?.value
                }
              </h2>
              <p className="mb-2">
                <span className="font-bold">From:</span>{" "}
                {
                  selectedEmail.payload.headers.find(
                    (header) => header.name === "From"
                  )?.value
                }
              </p>
              <p className="mb-2">
                <span className="font-bold">Snippet:</span>{" "}
                {selectedEmail.snippet}
              </p>
              <p className="mb-2">
                <span className="font-bold">Classification:</span>{" "}
                <span
                  className={getClassificationColor(
                    selectedEmail.classification
                  )}
                >
                  {selectedEmail.classification}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
