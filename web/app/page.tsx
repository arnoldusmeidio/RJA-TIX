"use client";

import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { FiPlayCircle } from "react-icons/fi";

export default function Home() {
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

  const entries = movies.slice(0, 4);

  return (
    <main>
      {/* Carousel */}
      <section className="slider">
        <div className="carousel w-full h-full min-h-96 md:min-h-full">
          <div id="item1" className="carousel-item w-full relative">
            <Image
              src="/Bg (Films 1).png"
              width={1440}
              height={550}
              alt="Carousel-1"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="body-text text-center absolute top-0 bottom-0 right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-inter font-semibold text-third sm:mb-5 md:mb-5">
                Spider-Man-2: Into the Spider-Verse
              </h2>
              <h4 className="release text-third font-inter font-medium text-base sm:text-xl md:text-2xl">
                2018
              </h4>
            </div>
          </div>
        </div>
        <div className="absolute md:hidden left-1/2 -translate-x-1/2 mt-[-1.8rem] sm:mt-[-2.5rem] flex items-start gap-2">
          <a href="#item1" className="bg-third px-5 py-1 rounded"></a>
          <a
            href="#item2"
            className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
          ></a>
          <a
            href="#item3"
            className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
          ></a>
          <a
            href="#item2"
            className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
          ></a>
        </div>
        <div className="info w-full h-14">
          <div className="duration absolute my-3 mx-6 md:ms-14 lg:ms-32 flex item-start">
            <h5 className="text-sm md:text-xl text-fourth flex align-middle justify-center font-inter font-semibold">
              <FiPlayCircle className="text-2xl text-third me-2 my-auto" />1
              hour 57m <span className="text-third mx-2">|</span>Cartoon,
              Action, Family
            </h5>
          </div>
          <div className="indicators absolute hidden md:flex left-2/3 sm:left-3/4 md:mt-5 items-start gap-2">
            <a href="#item1" className="bg-third px-5 py-1 rounded"></a>
            <a
              href="#item2"
              className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
            ></a>
            <a
              href="#item3"
              className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
            ></a>
            <a
              href="#item2"
              className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"
            ></a>
          </div>
        </div>
      </section>
      {/* Carousel */}

      {/* Featued Movies */}
      <section className="featured-movies bg-primary w-full h-full py-10">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl">
            <span className="text-third">Movies</span> This Week
          </h4>
          <h6 className="text-center sm:text-end sm:ms-auto mt-auto">
            <Link
              href="/movies"
              className=" font-lato text-third font-medium text-base hover:underline underline-offset-2 transition-all ease-in"
            >
              More Movies
            </Link>
          </h6>
        </div>
        <div className="movies-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-5 md:mx-10 lg:mx-20 gap-5 lg:gap-20 pt-5">
          {entries?.map((item, idx: number) => (
            <div
              key={idx}
              className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl"
            >
              <figure className="relative">
                <Image
                  src={`${item.posterUrl || "/Default Movie Poster.jpg"}`}
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
      </section>
      {/* Featued Movies */}

      {/* Others */}
      <section className="others bg-primary w-full h-full py-10">
        <div className="grid grid-cols-3 grid-rows-2 gap-8 mx-7 sm:mx-10 md:mx-20">
          <div className="col-span-3 row-span-2 sm:col-span-1  sm:row-span-2 flex justify-center items-center">
            <Image
              src="/Others-1.png"
              width={500}
              height={520}
              alt="Register"
              className="h-full object-cover rounded-xl"
              loading="lazy"
            />
            <Link
              href="/register"
              className="absolute text-3xl font-semibold font-inter text-fourth text-center max-w-64"
            >
              Join now and enjoy exclusive perks!
            </Link>
          </div>
          <div className="col-span-3 row-span-2 md:col-span-2 md:row-span-1 flex justify-center items-center">
            <Image
              src="/Others-2.png"
              width={700}
              height={240}
              alt="Cinemas"
              className="w-full object-cover rounded-xl"
              loading="lazy"
            />
            <Link
              href="/cinemas"
              className="absolute text-3xl font-semibold font-inter text-fourth text-center max-w-64"
            >
              Our Cinemas
            </Link>
          </div>
          <div className="col-span-3 row-span-2 md:col-span-2 md:row-span-1 flex justify-center items-center">
            <Image
              src="/Others-3.png"
              width={700}
              height={240}
              alt="Offers"
              className="w-full object-cover rounded-xl"
              loading="lazy"
            />
            <Link
              href="/offers"
              className="absolute text-3xl font-semibold font-inter text-fourth text-center max-w-64"
            >
              Our Offers
            </Link>
          </div>
        </div>
      </section>
      {/* Others */}
    </main>
  );
}
