"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Cinema, Movie, Studios } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function GetCinemaShowtimes({
  params,
}: {
  params: { id: string };
}) {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    async function getMovie() {
      try {
        const movies = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies/search/${params.id}`,
          {
            credentials: "include",
          }
        );
        const data = await movies.json();
        setMovie(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovie();

    async function getCinemas() {
      try {
        const cinemas = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/cinemas/search/showtimes/${params.id}`,
          { credentials: "include" }
        );
        const data = await cinemas.json();
        setCinemas(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCinemas();
  }, []);

  return (
    <section className="film">
      <div>
        {!movie ? (
          // ketika id yang ditampilkan tidak ada
          <div className="h-screen flex text-center">
            <div className="w-full max-w-xl m-auto p-5 md:p-0">
              <h3 className="text-2xl md:text-5xl font-inter font-semibold text-third mb-7">
                <span className="text-third">
                  Sorry, but the film you are looking for doesn't exist.
                </span>
              </h3>
              <Link href="/">
                <button className="btn btn-sm bg-third text-xl text-primary hover:bg-primary hover:text-third transition-all ease-in-out">
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // ketika id yang ditampilkan tidak ada
          // ketika id yang ditampilkan ada
          <section className="head w-full h-full">
            {/* Hero Bg */}
            <section className="hero bg-gradient-to-b from-sixth to-primary">
              <div className="hero min-h-64">
                <div className="hero-content text-center">
                  <div className="body-text text-center absolute right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-inter font-semibold text-fourth ">
                      Booking Details in <br />
                      <span className="text-third">RJA.TIX</span>
                    </h2>
                    <p className=" font-inter font-medium text-xl md:text-2xl text-fourth">
                      Check full <span className="text-third">schedule</span>{" "}
                      availability.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="mb-12 bg-third h-1 rounded mx-7 sm:mx-20 md:mx-10 lg:mx-32"></div>
            {/* Hero Bg */}

            <section className="content-center flex-row lg:flex mx-7 sm:mx-20 md:mx-10 lg:mx-32 gap-20">
              <div className="card lg:card-side">
                <figure className="w-full h-full relative">
                  <Image
                    src={`${movie?.posterUrl || "/Default Movie Poster.jpg"}`}
                    width={550}
                    height={570}
                    alt="Poster Films"
                    className="w-full aspect-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 rounded-xl transition-opacity duration-300">
                    <p className="text-center font-inter font-bold text-third text-3xl opacity-100">
                      {movie?.releaseYear}
                    </p>
                  </div>
                </figure>
                <div className="card-body ms-0 lg:ms-20 mt-7 p-0">
                  <h4 className="title-film text-center lg:text-start text-6xl font-inter font-semibold text-third capitalize">
                    {movie?.title}
                  </h4>
                  <div className="flex justify-center lg:justify-start mt-2">
                    <h5 className="year-film text-center lg:text-start text-3xl font-inter font-medium text-fourth">
                      {movie?.director}
                    </h5>
                    <h5 className="year-film text-center lg:text-start text-3xl font-inter font-medium text-third mx-2">
                      |
                    </h5>
                    <h5 className="rated-film text-center lg:text-start text-3xl font-inter font-medium text-fourth uppercase">
                      {movie?.rated.replace("_", " ")}
                    </h5>
                  </div>
                  <h5 className="text-center lg:text-start text-2xl mt-7 font-inter font-medium text-fourth">
                    Synopsis:
                  </h5>
                  <p className="synopsis-film text-justify text-xl font-montserrat font-medium text-fourth">
                    {movie?.synopsis}
                  </p>
                </div>
              </div>
            </section>
            <div className="sm:flex content-center mt-10 mx-7 sm:mx-20 md:mx-10 lg:mx-32 mb-2 pb-3 border-b-4 border-third rounded">
              <h4 className="font-lato font-medium text-center text-fourth sm:text-start text-3xl">
                Schedule
              </h4>
            </div>
            <div>
              {cinemas?.length === 0 ? (
                <div className="font-inter text-2xl font-semibold text-third text-center my-10">
                  No Schedule
                </div>
              ) : null}
            </div>
            <div className="md:flex gap-3 mx-7 sm:mx-20 md:mx-10 lg:mx-20 mt-5">
              {cinemas?.map((cinema) => (
                <CinemaList key={cinema.id} cinema={cinema} />
              ))}
            </div>
          </section>
          // ketika id yang ditampilkan ada
        )}
      </div>
    </section>
  );
}

const CinemaList = ({ cinema }: { cinema: Cinema }) => {
  return (
    <section className="schedule mx-7 sm:mx-20 md:mx-10 lg:mx-14">
      <div className="flex-row">
        <h5 className="rated-film text-center md:text-start text-3xl font-inter font-semibold text-third capitalize">
          {cinema.name}
        </h5>
        <h6 className="rated-film text-center md:text-start text-2xl mt-7 font-inter font-medium text-fourth capitalize">
          Schedule:
        </h6>
        <div className="rated-film text-center md:text-start font-medium text-fourth capitalize mb-14">
          {cinema.studios.map((studio) => (
            <StudioList key={studio.id} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioList = ({ studio }: { studio: Studios }) => {
  return (
    <div>
      {studio.showtimes.length === 0 ? null : (
        <div>
          <div className="font-inter text-lg mt-2">
            Studio {studio.number} -{" "}
            <span className="text-third">
              {studio.studioType.replace("_", " ")}
            </span>
          </div>
          {studio.showtimes.map((showtime) => (
            <div
              key={showtime.id}
              className="text-base font-montserrat hover:text-third"
            >
              {/* Link ini href-nya bisa dibuat modal pop-up bisa dibuat page baru */}
              <Link href={`/movies/${showtime.id}/booking`}>
                {format(showtime.startTime.toString(), "PP")} -{" "}
                {format(showtime.startTime.toString(), "p")}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
