"use client";

import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import { useEffect } from "react";

export default function NotAuthorized() {
  const { user, update } = useUserStore();

  useEffect(() => {
    async function getUser() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        update(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <main className="bg-primary flex h-screen text-center">
      {/* Not Authorized */}
      <div className="w-full max-w-xl m-auto p-5 md:p-0">
        <h3 className="text-2xl md:text-5xl font-inter font-semibold text-third mb-7">
          <span className="text-third">Sorry, but you are not authorized.</span>
        </h3>
        <h3 className="text-base md:text-2xl font-inter font-semibold text-third mb-7">
          <span className="text-third">
            If you think you should be able to access this page,
            <br />
            please contact our admin and give your user-ID
          </span>
        </h3>
        <h3 className="text-xl md:text-4xl font-inter font-semibold text-third mb-7">
          <span className="text-third">
            {user ? `User ID: ${user?.id}` : "Getting User ID..."}
          </span>
        </h3>
        <Link href="/">
          <button className="btn btn-sm bg-third text-xl text-primary hover:bg-primary hover:text-third transition-all ease-in-out">
            Home
          </button>
        </Link>
      </div>
      {/*  Not Authorized */}
    </main>
  );
}
