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
            <span className="label-text font-semibold text-fourth align-middle text-base ms-2">
              Email Address
            </span>
            <input
              type="text"
              placeholder="Type your email"
              className="input input-bordered w-full lg:w-4/5 bg-secondary border-third border-2"
            />
            <span className="label-text font-semibold text-fourth align-middle text-base ms-2">
              Password
            </span>
            <input
              type="text"
              placeholder="Type your pass"
              className="input input-bordered w-full lg:w-4/5 bg-secondary border-third border-2"
            />
            <div className="inline-flex align-middle mt-1">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-warning border-third border-2"
              />
              <span className="label-text font-medium text-fourth ms-2">
                Remember me
              </span>
            </div>
            <button className="btn w-full lg:w-4/5 bg-third hover:bg-secondary mt-20 font-semibold text-base text-fifth hover:text-white">
              Register Account
            </button>
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
