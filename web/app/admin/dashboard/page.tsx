"use client";

import { format } from "date-fns";
import { useUserStore } from "@/stores/user-store";
import { AdminVoucher, Cinema, Manager, Movie, User } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Admin() {
  const { user } = useUserStore();
  const [vouchers, setVouchers] = useState<AdminVoucher[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getVouchers() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/vouchers`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setVouchers(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getVouchers();

    async function getCinema() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/cinemas`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setCinemas(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCinema();

    async function getMovies() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setMovies(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovies();

    async function getUsers() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users/search`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  return (
    <main className="bg-primary">
      {/* Head SuperAdmin */}
      <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded max-sm:grid max-sm:grid-cols-1 justify-items-center">
        <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
          Dashboard Admin
        </h4>
        {user?.manager ? (
          <Link
            href={"/super-admin/dashboard"}
            className=" max-sm:w-80 mx-10 mt-1 btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold"
          >
            Go to Super Admin Dashboard
          </Link>
        ) : null}
      </section>
      {/* Head SuperAdmin */}

      {/* Count Dashboard */}
      <section className="count content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-7 mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-4 gap-8">
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-64 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {vouchers.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Active Vouchers
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-64 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {cinemas.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Cinemas
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-64 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {movies.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Movies
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-64 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {users.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Users
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Count Dashboard */}

      {/* Table List 1*/}
      <section className="table-dashboard content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Table Manager */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Voucher List
            </h4>
            <div className="button-add-delete flex">
              <Link
                href={"/admin/dashboard/voucher"}
                className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold"
              >
                Add Voucher
              </Link>
              {/* <button className="btn btn-sm ms-5 bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                Select Manager
              </button> */}
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Manager</button> */}
            </div>
            <div className="manager overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Voucher ID</th>
                    <th>Availability</th>
                    <th>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map manager info */}
                  {vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                      <th className="w-[40%]">{voucher.id.toUpperCase()}</th>
                      <td>{voucher.availability}</td>
                      <td>{format(voucher.expiredAt.toString(), "P")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Manager */}

          {/* Table Cinema */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Cinema List
            </h4>
            <div className="button-add-delete flex gap-4">
              <Link
                href={"/admin/dashboard/cinema"}
                className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold"
              >
                Add Cinema
              </Link>
            </div>
            <div className="cinema overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Location</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map Cinema info */}
                  {cinemas.map((cinema) => (
                    <tr key={cinema.id}>
                      <th>{cinema.id}</th>
                      <td>{cinema.name}</td>
                      <td>{cinema.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Cinema */}
        </div>
      </section>
      {/* Table List 1*/}
      {/* Table List 2*/}
      <section className="table-dashboard content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-20">
        <div className="grid grid-cols-1 gap-10">
          {/* Table Film */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Movie List
            </h4>
            <div className="button-add-delete flex">
              <Link href="/admin/dashboard/movie">
                <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                  Add Movies
                </button>
              </Link>
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Movie</button> */}
            </div>
            <div className="cinema overflow-auto max-h-[500px]">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Genre</th>
                    <th>Synopsis</th>
                    <th>Rated</th>
                    <th>Duration</th>
                    <th>Release Year</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map movies info */}
                  {movies.map((movie, idx) => (
                    <tr className="hover">
                      <th>{idx + 1}</th>
                      <td>{movie.title}</td>
                      <td>{movie.director}</td>
                      <th>{movie.genre.replace("_", " ")}</th>
                      <td>{movie.synopsis}</td>
                      <td>{movie.rated.replace("_", " ")}</td>
                      <th>{movie.duration}</th>
                      <td>{movie.releaseYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Film */}
        </div>
      </section>
      {/* Table List 2*/}
    </main>
  );
}
