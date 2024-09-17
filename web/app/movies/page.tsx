"use client";

import Carousels from "@/components/Carousels";
import PaginationControls from "@/components/PaginationControls";
import { Movie } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Movies({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
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
  }, []);

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "8";

  // per page will show 8 movies
  const start = (Number(page) - 1) * Number(per_page); // 0, 8, 16 ...
  const end = start + Number(per_page); // 8, 16, 24 ...

  const entries = movies.slice(start, end);

  return (
    <main>
      {/* Carousels */}
      <Carousels />
      {/* Carousels */}

      {/* Movie this Week */}
      <section
        className="featured-movies bg-primary w-full h-full py-10"
        id="movie-section"
      >
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl">
            <span className="text-third">Movies</span> This Week
          </h4>
          <div className="dropdown dropdown-bottom items-center w-full sm:dropdown-end text-center sm:text-end sm:ms-auto mt-auto font-lato text-third font-medium text-base hover:underline underline-offset-2 transition-all ease-in">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Filter by Genre
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-secondary grid grid-cols-3 rounded-box z-[1] w-96 p-2 shadow"
            >
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Action
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Family
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Scifi
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Adventure
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Fantasy
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Sport
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Animation
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  History
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Thriller
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Comedy
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Crime
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Music
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Documentary
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Mystery
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Drama
                </span>
              </div>
              <div className="inline-flex align-middle mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-warning border-third border-2"
                />
                <span className="label-text font-medium text-fourth ms-2">
                  Romance
                </span>
              </div>
            </ul>
          </div>
        </div>
        <div className="movies-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-5 md:mx-10 lg:mx-20 gap-5 lg:gap-20 pt-5">
          {entries?.map((item, idx: number) => (
            <div
              key={idx}
              className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl"
            >
              <figure className="relative">
                <Image
                  src={item.posterUrl || "/Default Movie Poster.jpg"}
                  width={250}
                  height={270}
                  alt="Poster Films"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                  <p className="text-center font-inter font-bold text-third text-3xl opacity-100">
                    {item.releaseYear}
                  </p>
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-justify text-third font-inter font-semibold">
                  {item.title}
                </h2>
                <div className="duration-price inline-flex text-sm mt-auto">
                  <p className="price">{item.director}</p>
                  <p className="text-fourth text-end font-inter font-semibold mb-3">
                    <span className="text-third me-2">|</span>{" "}
                    {item.rated.replace("_", " ")}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <Link
                    href={`/movies/${item.id}`}
                    className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out"
                  >
                    Book Ticket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {movies.length !== 0 ? (
          <PaginationControls
            hasNextPage={end < movies.length}
            hasPrevPage={start > 0}
            dataLength={movies.length}
          />
        ) : null}
      </section>
      {/* Movie this Week */}

      {/* Coming Soon */}
      <section className="coming-soon bg-primary w-full h-full py-10">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl">
            <span className="text-third">Movies</span> Coming soon
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-20 pt-5">
          <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
            <figure>
              <Image
                src="/Coming-soon-1.png"
                width={350}
                height={200}
                alt="Coming soon Poster Films"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body absolute">
              <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">
                Descicable Me 6: Homeless
              </h2>
            </div>
          </div>
          <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
            <figure>
              <Image
                src="/Coming-soon-2.png"
                width={350}
                height={200}
                alt="Coming soon Poster Films"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body absolute">
              <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">
                Spider-man: Dont Have Home
              </h2>
            </div>
          </div>
          <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
            <figure>
              <Image
                src="/Coming-soon-3.png"
                width={350}
                height={200}
                alt="Coming soon Poster Films"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body absolute">
              <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">
                Deadpool Go to School
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* Coming Soon */}
    </main>
  );
}
