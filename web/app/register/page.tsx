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
                        <h2 className="font-lato font-semibold text-5xl text-fourth">Create an account</h2>
                        <h4 className="font-lato font-medium text-xl text-fourth cursor-pointer mb-10">Already have an account? <Link href="/login" className="text-third hover:underline underline-offset-2"> Login</Link></h4>
                        <div className="flex-row md:inline-flex md:gap-12 lg:gap-10">
                            <div className="name grid grid-row">
                                <span className="label-text font-semibold text-fourth align-middle text-base ms-2">Name</span>
                                <input type="text" placeholder="Type your name" className="input input-bordered w-full md:w-80 lg:w-64 bg-secondary border-fourth focus:border-third border-2" />
                            </div>
                            <div className="phone grid grid-row">
                                <span className="label-text font-semibold text-fourth align-middle text-base ms-2">Phone number</span>
                                <input type="text" placeholder="Type your phone number" className="input input-bordered w-full lg:w-64 bg-secondary border-fourth focus:border-third border-2" />
                            </div>
                        </div>
                        <div className="email grid grid-row">
                            <span className="label-text font-semibold text-fourth align-middle text-base ms-2">Email Address</span>
                            <input type="text" placeholder="Type your email address" className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2" />
                        </div>
                        <div className="pass grid grid-row">
                            <span className="label-text font-semibold text-fourth align-middle text-base ms-2">Create Password</span>
                            <input type="text" placeholder="Type your new password" className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2" />
                        </div>
                        <div className="con-pass grid grid-row">
                            <span className="label-text font-semibold text-fourth align-middle text-base ms-2">Confirm Password</span>
                            <input type="text" placeholder="Type again your password" className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2" />
                        </div>
                        <button className="btn w-full lg:w-4/5 bg-third hover:bg-secondary mt-20 font-semibold text-base text-fifth hover:text-white">Register Account</button>
                    </div>
                </div>
            </section>
        </main>
    )
}