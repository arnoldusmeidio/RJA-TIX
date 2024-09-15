import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-primary flex h-screen text-center">
      {/* Not Found */}
      <div className="w-full max-w-xl m-auto p-5 md:p-0">
        <h3 className="text-2xl md:text-5xl font-inter font-semibold text-third mb-7">
          <span className="text-third">
            Sorry, but we don't have what you need.
          </span>
        </h3>
        <Link href="/">
          <button className="btn btn-sm bg-third text-xl text-primary hover:bg-primary hover:text-third transition-all ease-in-out">
            Go Home
          </button>
        </Link>
      </div>
      {/* Not Found */}
    </main>
  );
}
