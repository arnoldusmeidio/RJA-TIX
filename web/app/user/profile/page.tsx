"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Movie } from "@/types";
import { useUserStore } from "@/stores/user-store";
import { format } from "date-fns";

import ReviewModal from "@/components/ReviewModal";

export default function Profile() {
  const { user, update } = useUserStore();
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await user.json();
        update(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();

    async function getWatchedMovie() {
      try {
        const watchedMovie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies/reviews`,
          {
            credentials: "include",
          }
        );
        const data = await watchedMovie.json();
        setWatchedMovies(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getWatchedMovie();
  }, []);

  return (
    <main>
      {/* Profile Dashboard */}
      <section className="profile bg-primary w-full h-full py-10">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            Dashboard
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] content-center items-center mx-auto sm:mx-20 gap-10 mt-10 lg:mt-20">
          <div className="profile avatar mx-auto">
            <div className="w-40 sm:w-64 lg:w-72 rounded-full">
              <Image
                src="/user.png"
                width={512}
                height={512}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto gap-5 lg:gap-20">
            <div className="name content-center">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Name:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.name}
              </h6>
            </div>
            <div className="referral content-center ms-0 lg:ms-10">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                User ID / Referral Code:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.id}
              </h6>
            </div>
            <div className="email content-center">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Email:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.email}
              </h6>
            </div>
            <div className="wallet content-center ms-0 lg:ms-10">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Your Wallet Balance:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user ? `Rp.${user?.wallet?.balance},00` : null}
              </h6>
            </div>
            <div className="point content-center ms-0">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Your Points:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.totalPoints}
              </h6>
            </div>
          </div>
        </div>
      </section>
      {/* Profile Dashboard */}

      {/* Watched Movies */}
      <section className="watched bg-primary w-full h-full mb-6">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            Watched Movies
          </h4>
        </div>
        <div className="overflow-x-auto content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Film</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {/* Map watched movies */}

              {watchedMovies?.map((item, idx: number) => (
                <tr key={item.id} className="hover:bg-secondary text-center">
                  <th>{idx + 1}</th>
                  <td>{item.title}</td>
                  <td>
                    {/* Map modal untuk review */}
                    <ReviewModal movieData={item} idx={idx} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Watched Movies */}

      {/* My Tickets */}
      <section className="ticket bg-primary w-full h-full mb-20">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            My Tickets
          </h4>
        </div>

        {/* Map through tickets */}
        {user?.tickets.map((item, idx: number) => (
          <div
            key={idx}
            className="booked-film flex flex-col md:flex-row content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 pt-7 gap-5 md:gap-20"
          >
            <div className="poster mx-auto md:mx-0">
              <Image
                src={`${item.bookings[0].showtime.movie.posterUrl}`}
                width={230}
                height={270}
                alt="Poster Films"
                className="w-64 h-full object-cover rounded-2xl"
              />
            </div>
            <div className="body-text mt-3">
              <h5 className="font-inter font-semibold text-center md:text-start text-4xl text-third mb-2">
                {item.bookings[0].showtime.movie.title}
              </h5>
              <p className="cinema font-inter font-medium text-center md:text-start text-xl text-fourth mb-1">
                {item.bookings[0].showtime.studio.studioType.replace("_", " ")}
                <span className="mx-3"> | </span>
                {item.bookings[0].showtime.studio.cinema.name}
              </p>
              <p className="clock font-inter font-semibold text-center md:text-start text-2xl text-third mb-5">
                {format(item.bookings[0].showtime.startTime, "PP")} -{" "}
                {format(item.bookings[0].showtime.startTime, "p")}
              </p>
              <h6 className="seat font-inter font-medium text-center md:text-start text-xl text-fourth mb-1">
                Your Seat:
              </h6>
              <div className="inline-flex w-full justify-center md:justify-start gap-5">
                {item.bookings.map((item, idx: number) => (
                  <p
                    key={idx}
                    className="font-inter font-semibold text-xl text-third"
                  >
                    {`${item.row}.${item.column}`}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* My Tickets */}
    </main>
  );
}
