import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <section className="w-full h-full bg-primary md:p-20">
        <div className="card lg:card-side bg-primary">
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
                {" "}
                Register
              </Link>
            </h4>
            <LoginForm />
          </div>
          <figure className="border-l-4 border-third ps-7">
            <Image
              src="/Login.png"
              alt="Login Image"
              width={530}
              height={630}
              className="rounded hidden lg:block"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
