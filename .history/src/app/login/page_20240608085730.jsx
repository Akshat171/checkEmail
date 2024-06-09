"use client";

import { FC, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import { toast } from "react-hot-toast";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      //display error message
      toast.error("Something went wrong with your login");
    } finally {
      setIsLoading(false);
    }
  }

  const session = useSession();
  console.log(session);
  if (session.status === "loading") {
    return <p>Loading ...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col items-center text-center gap-y-10">
            <div className="flex flex-col items-center">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <button
              type="button"
              onClick={loginWithGoogle}
              class="bg-indigo-400 h-max  max-w-sm mx-auto w-full rounded-lg text-white font-bold hover:bg-indigo-300  duration-[500ms,800ms]"
            >
              {isLoading ? (
                <div class="flex items-center justify-center m-[10px]">
                  <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                  <div class="ml-2"> Processing...</div>
                </div>
              ) : (
                <div class="flex items-center justify-center m-[10px]">
                  {" "}
                  <div class="ml-2"> Google</div>
                </div>
              )}
            </button>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter your OpenAI API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <p className="max-w-xl mt-1  text-lg text-slate-600">
              Email checking, Anytime, Anywhere with{" "}
              <span className="font-bold">checkemail</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
