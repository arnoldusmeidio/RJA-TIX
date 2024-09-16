"use client";
import Link from "next/link";

export default function Error() {
  return (
    <main className="bg-primary flex h-screen text-center">
      {/* Loading */}
      <div className="w-full max-w-xl m-auto p-5 md:p-0">
        <h3 className="text-2xl md:text-5xl font-inter font-semibold text-third mb-7">
          <span className="text-third">
            Uh oh.. Something went wrong. We are very sorry.
          </span>
        </h3>
        <Link href="/">
          <button className="btn btn-sm bg-third text-xl text-primary hover:bg-primary hover:text-third transition-all ease-in-out">
            Go Home
          </button>
        </Link>
      </div>
      {/* Loading */}
    </main>
  );
}
