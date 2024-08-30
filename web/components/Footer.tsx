import Image from "next/image";
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";

export default function Footer() {

    return (
        <footer className="content-center pt-10 px-10 bg-secondary">
            <div className="footer bg-secondary text-base-content ">
                <nav>
                    <Link href="/" className="pb-2 max-w-64 text-left md:text-right md:ms-auto cursor-pointer">
                        <Image
                            src="/Brand.png"
                            width={150}
                            height={50}
                            alt="Logo - JRA.TIX"
                            className="w-full h-14"
                            loading="lazy"
                        />
                    </Link>
                </nav>
                <nav className="ms-auto font-lato flex my-auto text-base gap-7 capitalize">
                    <Link href="#" className="link link-hover hover:text-third hover:underline underline-offset-2 transition-all ease-in">Home</Link>
                    <Link href="#" className="link link-hover hover:text-third hover:underline underline-offset-2 transition-all ease-in">Motorcycles</Link>
                    <Link href="#" className="link link-hover hover:text-third hover:underline underline-offset-2 transition-all ease-in">Services</Link>
                    <Link href="#" className="link link-hover hover:text-third hover:underline underline-offset-2 transition-all ease-in">About</Link>
                    <Link href="#" className="link link-hover hover:text-third hover:underline underline-offset-2 transition-all ease-in">Others</Link>
                </nav>
            </div>
            <div className="footer bg-secondary items-center  border-t py-3">
                <aside className="grid-flow-col items-center text-neutral-content">
                    <p>Copyright © {new Date().getFullYear()} RJA.TIX - All right reserved</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-xl">
                    <Link href="#" className="p-2 hover:bg-primary hover:text-third rounded-xl transition-all ease-in-out"><FaInstagram /></Link>
                    <Link href="#" className="p-2 hover:bg-primary hover:text-third rounded-xl transition-all ease-in-out"><FaXTwitter /></Link>
                    <Link href="#" className="p-2 hover:bg-primary hover:text-third rounded-xl transition-all ease-in-out"><FaGoogle /></Link>
                </nav>
            </div>
        </footer>
    )
}