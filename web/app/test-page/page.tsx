import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="card-body">
      <h2 className="font-lato font-semibold text-5xl text-fourth">
        Welcome back to{" "}
        <span className="hover:text-third transition-all ease-linear cursor-pointer">
          RJA.TIX
        </span>
      </h2>
      <h4 className="font-lato font-medium text-xl text-fourth cursor-pointer mb-10">
        Don't have a account?{" "}
        <Link
          href="/register"
          className="text-third hover:underline underline-offset-2"
        >
          Register
        </Link>
      </h4>
      <LoginForm />
    </div>
  );
}
