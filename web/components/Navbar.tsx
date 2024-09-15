import 'animate.css';

import Image from "next/image"
import Link from "next/link"

import { IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoIosHelpCircle } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";

export default function Navbar() {

    return (
        <nav className="navbar bg-secondary">
            <div className="navbar-start">
                <div className="drawer lg:hidden z-20">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="btn btn-ghost text-xl drawer-button"><FaBars /></label>
                    </div>
                    {/* Sidebar Phone */}
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80">
                            <label htmlFor="my-drawer" className="text-2xl drawer-button px-4 pt-3 pb-3"><IoClose /></label>
                            <h3 className='text-xl px-5 py-3 text-third divider divider-neutral'>Pages</h3>
                            <Link href="/" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><FaHome /></span>Home</Link>
                            <Link href="/movies" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><MdLocalMovies /></span>Movies</Link>
                            <Link href="/cinemas" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><BiSolidCameraMovie /></span>Cinemas</Link>
                            <Link href="/offers" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><RiDiscountPercentLine /></span>Offers</Link>
                            <Link href="/help" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><IoIosHelpCircle /></span>Help</Link>
                            {/* Cart Phone */}
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">Account balance:</div>
                                <div className="collapse-content shadow-2xl rounded-2xl">
                                    <h4 className="text-base font-normal">Your balance:</h4>
                                    <span className="text-base font-normal">Rp.<span className="ms-2 text-third">50.000,00</span></span>
                                </div>

                            </div>
                            {/* Cart Phone */}

                            {/* Profile Phone */}
                            <div className="dropdown dropdown-top dropdown-hover sm:hidden profile mt-auto mb-3 p-3 px-4 bg-secondary rounded-2xl shadow-lg transition-all ease-in">
                                <div tabIndex={0} role="button" className="flex">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-8 rounded-full">
                                            <Image
                                                src="/user.png"
                                                width={512}
                                                height={512}
                                                alt="User Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="body ms-7 my-auto">
                                        <h4 className='text-base'>User</h4>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow delay-100">
                                    <Link className='p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg' href="/profile">Profile</Link>
                                    <Link className='p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg' href="/login">Login / Register</Link>
                                </ul>
                            </div>
                            {/* Profile Phone */}
                        </ul>
                    </div>
                    {/* Sidebar Phone */}
                </div>
                {/* Brand */}
                <a className="btn btn-ghost hidden lg:block">
                    <Image
                        src="/Brand.png"
                        width={150}
                        height={50}
                        alt="Logo - JRA.TIX"
                        className="w-full h-full"
                        loading="lazy"
                    />
                </a>
                {/* Brand */}
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost lg:hidden">
                    <Image
                        src="/Brand.png"
                        width={150}
                        height={50}
                        alt="Logo - JRA.TIX"
                        className="w-full h-full"
                        loading="lazy"
                    />
                </a>
                <ul className="hidden lg:flex menu menu-horizontal px-1 gap-12 font-lato text-base text-fourth">
                    <Link href="/" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Home</Link>
                    <Link href="/movies" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Movies</Link>
                    <Link href="/cinemas" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Cinemas</Link>
                    <Link href="/offers" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Offers</Link>
                    <Link href="/help" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Help</Link>
                </ul>
            </div>
            <div className="navbar-end">
                {/* Search */}
                <div className="dropdown dropdown-end">
                    <label htmlFor="search-modal" role="button" tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <IoMdSearch className="h-5 w-5" />
                        </div>
                    </label>
                    {/* Modal */}
                    <input type="checkbox" id="search-modal" className="modal-toggle" />
                    <div className="modal animate__animated animate__fadeInUpBig" role="dialog">
                        <div className="modal-box w-11/12 max-w-2xl h-5/6 max-h-full">
                            <div className="form-control">
                                <span className="label-text font-medium font-lato text-fourth tracking-wide pb-2">What movie would you like to watch?</span>
                                <div className="search flex gap-3">
                                    <input type="text" placeholder="Search Here" className="input input-bordered font-montserrat rounded-xl w-full placeholder:hover:translate-x-1 placeholder:transition-all placeholder:ease-in-out" />
                                    <button className="btn bg-primary border-0 w-12 hover:text-third"><IoMdSearch className="h-full w-full" /></button>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="recent">
                                <span className="label-text text-base">Recent</span>
                                <div className="grid grid-flow-row gap-4">
                                    <div className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-all ease-in">
                                        <div className="card-body max-h-full">
                                            <div className="heading sm:inline-flex">
                                                <h3 className="card-title text-base">The Little Lost Dragon</h3>
                                                <h4 className="text-base ms-auto"><span className="badge badge-base badge-ghost bg-third text-primary font-medium">G</span></h4>
                                            </div>
                                            <p className="text-justify font-montserrat">A heartwarming tale about a tiny dragon who gets separated from his family during a magical storm.</p>
                                            <button className="btn hover:text-third mt-auto">See Movies</button>
                                        </div>
                                    </div>
                                    <div className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-all ease-in">
                                        <div className="card-body max-h-full">
                                            <div className="heading sm:inline-flex">
                                                <h3 className="card-title text-base">The Midnight Mystery</h3>
                                                <h4 className="text-base ms-auto"><span className="badge badge-base badge-ghost bg-third text-primary font-medium">PG-13</span></h4>
                                            </div>
                                            <p className="text-justify font-montserrat">A group of friends discover a mysterious old book that transports them to a magical world filled with hidden treasures and puzzling riddles.</p>
                                            <button className="btn hover:text-third mt-auto">See Movies</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="modal-backdrop" htmlFor="search-modal">Close</label>
                    </div>
                    {/* Modal */}
                </div>
                {/* Search */}

                {/* Account balance */}
                <div className="dropdown dropdown-end hidden sm:block">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <IoWalletOutline className='text-xl' />
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">Your balance</span>
                            <span className="text-sm font-normal">Rp.<span className="ms-2 text-third">50.000,00</span></span>
                        </div>
                    </div>
                </div>
                {/* Account balance */}

                {/* Profiles Desktop & Tablet */}
                <div className="dropdown dropdown-end hidden sm:block">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <Image
                                src="/user.png"
                                width={512}
                                height={512}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <Link className='p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg' href="/profile">Profile</Link>
                        <Link className='p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg' href="/login">Login / Register</Link>
                    </ul>
                </div>
                {/* Profiles Desktop & Tablet */}
            </div>
        </nav>
    )
}