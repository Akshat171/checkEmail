"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import Email from "../component/Emails/Email";
import Emails from "../component/Emails/Email";

const page = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="w-screen min-h-screen bg-white">
      <div className="flex justify-between items-center px-8 py-4 bg-gray-100">
        <div className="flex items-center">
          <Image
            src={session.data.user.image}
            alt={session.data.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="ml-4 text-xl font-bold">{session.data.user.name}</h2>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {/* Add your profile page content here */}
      <Emails />
    </div>
  );
};

export default page;
