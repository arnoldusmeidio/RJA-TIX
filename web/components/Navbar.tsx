"use client";

import "animate.css";

import Image from "next/image";
import Link from "next/link";

import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoIosHelpCircle } from "react-icons/io";

import Searchbar from "./Searchbar";
import { AccountBalanceIcon, AccountBalanceSidebar } from "./AccountBalance";
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";
import { cookies } from "next/headers";
import LogOutButton from "./LogOutButton";

export default function Navbar() {
  const { user, update } = useUserStore();

  useEffect(() => {
    async function getUser() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        update(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <nav className="navbar bg-secondary">
      <div className="navbar-start">
        <div className="drawer lg:hidden z-20">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost text-xl drawer-button"
            >
              <FaBars />
            </label>
          </div>
          {/* Sidebar Phone */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80">
              <label
                htmlFor="my-drawer"
                className="text-2xl drawer-button px-4 pt-3 pb-3"
              >
                <IoClose />
              </label>
              <h3 className="text-xl px-5 py-3 text-third divider divider-neutral">
                Pages
              </h3>
              <Link
                href="/"
                className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"
              >
                <span className="text-2xl me-2">
                  <FaHome />
                </span>
                Home
              </Link>
              <Link
                href="/movies"
                className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"
              >
                <span className="text-2xl me-2">
                  <MdLocalMovies />
                </span>
                Movies
              </Link>
              <Link
                href="/cinemas"
                className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"
              >
                <span className="text-2xl me-2">
                  <BiSolidCameraMovie />
                </span>
                Cinemas
              </Link>
              <Link
                href="/offers"
                className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"
              >
                <span className="text-2xl me-2">
                  <RiDiscountPercentLine />
                </span>
                Offers
              </Link>
              <Link
                href="/help"
                className="hover:bg-secondary inline-flex text-base px-8 my-1 p-2 rounded-2xl hover:text-third transition-all"
              >
                <span className="text-2xl me-2">
                  <IoIosHelpCircle />
                </span>
                Help
              </Link>
              {/* Cart Phone */}

              {user?.admin !== null ? null : user?.manager !== null ? null : (
                <AccountBalanceSidebar />
              )}

              {/* Cart Phone */}

              {/* Profile Phone */}
              <div className="dropdown dropdown-top dropdown-hover sm:hidden profile mt-auto mb-3 p-3 px-4 bg-secondary rounded-2xl shadow-lg transition-all ease-in">
                <div tabIndex={0} role="button" className="flex">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
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
                    <h4 className="text-base">User</h4>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64  shadow delay-100"
                >
                  {!user ? (
                    <Link
                      className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                      href="/login"
                    >
                      Login / Register
                    </Link>
                  ) : (
                    <>
                      {user.admin !== null ? (
                        <Link
                          className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      ) : user.manager !== null ? (
                        <Link
                          className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                          href="/manager/dashboard"
                        >
                          Manager Dashbboard
                        </Link>
                      ) : (
                        <Link
                          className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                          href="/user/profile"
                        >
                          Profile
                        </Link>
                      )}
                      <LogOutButton />
                    </>
                  )}
                </ul>
              </div>
              {/* Profile Phone */}
            </ul>
          </div>
          {/* Sidebar Phone */}
        </div>
        {/* Brand */}
        <Link href="/" className="btn btn-ghost hidden lg:block">
          <Image
            src="/Brand.png"
            width={150}
            height={50}
            alt="Logo - JRA.TIX"
            className="w-full h-full"
            loading="lazy"
          />
        </Link>
        {/* Brand */}
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost lg:hidden">
          <Image
            src="/Brand.png"
            width={150}
            height={50}
            alt="Logo - JRA.TIX"
            className="w-full h-full"
            loading="lazy"
          />
        </Link>
        <ul className="hidden lg:flex menu menu-horizontal px-1 gap-12 font-lato text-base text-fourth">
          <Link
            href="/"
            className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all"
          >
            Movies
          </Link>
          <Link
            href="/cinemas"
            className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all"
          >
            Cinemas
          </Link>
          <Link
            href="/offers"
            className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all"
          >
            Offers
          </Link>
          <Link
            href="/help"
            className="hover:underline hover:underline-offset-4 hover:underline-third hover:rounded-sm hover:text-third transition-all"
          >
            Help
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Search */}
        <Searchbar />

        {/* Search */}

        {/* Account balance */}
        {user?.admin !== null ? null : user?.manager !== null ? null : (
          <AccountBalanceIcon />
        )}
        {/* Account balance */}

        {/* Profiles Desktop & Tablet */}
        <div className="dropdown dropdown-end hidden sm:block">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {!user ? (
              <Link
                className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                href="/login"
              >
                Login
              </Link>
            ) : (
              <>
                {user.admin !== null ? (
                  <Link
                    className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                    href="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                ) : user.manager !== null ? (
                  <Link
                    className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                    href="/manager/dashboard"
                  >
                    Manager Dashbboard
                  </Link>
                ) : (
                  <Link
                    className="p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
                    href="/user/profile"
                  >
                    Profile
                  </Link>
                )}
                <LogOutButton />
              </>
            )}
          </ul>
        </div>
        {/* Profiles Desktop & Tablet */}
      </div>
    </nav>
  );
}
