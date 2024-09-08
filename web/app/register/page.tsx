import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <main>
      <section className="w-full h-full bg-primary md:p-20">
        <div className="card lg:card-side bg-primary">
          <figure className="border-r-4 border-third pe-7">
            <Image
              src="/Register.png"
              alt="Login Image"
              width={530}
              height={630}
              className="rounded hidden lg:block"
              loading="lazy"
            />
          </figure>
          <div className="card-body ms-0 lg:ms-10">
            <h2 className="font-lato font-semibold text-5xl text-fourth">
              Create an account
            </h2>
            <h4 className="font-lato font-medium text-xl text-fourth cursor-pointer mb-10">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-third hover:underline underline-offset-2"
              >
                {" "}
                Login
              </Link>
            </h4>
            <RegisterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
