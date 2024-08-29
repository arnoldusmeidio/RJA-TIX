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

export default function Navbar() {

    return (
        <div className="navbar bg-secondary">
            <div className="navbar-start">
                <div className="drawer lg:hidden z-20">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="btn btn-ghost text-xl drawer-button"><FaBars /></label>
                    </div>
                    {/* Sidebar */}
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80">
                            <label htmlFor="my-drawer" className="text-2xl drawer-button px-4 pt-3 pb-3"><IoClose /></label>
                            <h3 className='text-xl px-5 py-3 text-third divider divider-neutral'>Pages</h3>
                            <Link href="#" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><FaHome /></span>Home</Link>
                            <Link href="#" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><MdLocalMovies /></span>Movies</Link>
                            <Link href="#" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><BiSolidCameraMovie /></span>Cinemas</Link>
                            <Link href="#" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><RiDiscountPercentLine /></span>Offers</Link>
                            <Link href="#" className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"><span className='text-2xl me-2'><IoIosHelpCircle /></span>Help</Link>
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">Tickets Orders:</div>
                                <div className="collapse-content shadow-2xl rounded-2xl">
                                    <h4 className="text-sm font-normal">IMAX | Spiderman Going Not Home</h4>
                                    <p className="text-third">x2 Tickets</p>
                                    <p className="text-info pt-2">Subtotal: Rp. 40.000,00</p>
                                    <div className="card-actions pt-1">
                                        <button className="btn bg-secondary btn-sm btn-block border-none">View cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-top dropdown-hover sm:hidden profile mt-auto mb-3 p-3 px-4 bg-secondary rounded-2xl shadow-lg transition-all ease-in">
                                <div tabIndex={0} role="button" className="flex">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Profiles"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <div className="body ms-7 my-auto">
                                        <h4 className='text-base'>Jovi Rachman</h4>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow delay-100">
                                    <li><a className="justify-between">Profile</a></li>
                                    <li><a>Settings</a></li>
                                    <li><a>Login / Register</a></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                    {/* Sidebar */}
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
                    <Link href="#" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Home</Link>
                    <Link href="#" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Movies</Link>
                    <Link href="#" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Cinemas</Link>
                    <Link href="#" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Offers</Link>
                    <Link href="#" className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all">Help</Link>
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

                {/* Cart */}
                <div className="dropdown dropdown-end hidden sm:block">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">2</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">2 Tickets</span>
                            <span className="text-sm font-normal">IMAX | Spiderman Going Not Home <span className="text-third">x2</span></span>
                            <span className="text-info">Subtotal: Rp. 40.000,00</span>
                            <div className="card-actions">
                                <button className="btn bg-secondary btn-sm btn-block border-none">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Cart */}

                {/* Profiles */}
                <div className="dropdown dropdown-end hidden sm:block">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a className="justify-between">Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Login / Register</a></li>
                    </ul>
                </div>
                {/* Profiles */}
            </div>
        </div>
    )
}