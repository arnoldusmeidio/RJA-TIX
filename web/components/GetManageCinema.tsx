"use client";
import { Cinema, Showtimes } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export default function GetManageCinema() {
  const [myCinema, setMyCinema] = useState<Cinema[]>([]);

  useEffect(() => {
    async function getCinema() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/cinemas/managers`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setMyCinema(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCinema();
  }, []);

  return (
    <div>
      {/* Logic untuk cek hasil fetch cinema ada atau tidak */}
      <div>{myCinema?.length === 0 ? <div>No Cinema</div> : null}</div>

      <div className="flex flex-col gap-3">
        {myCinema?.map((cinema) => (
          <CinemaInfo key={cinema.id} cinema={cinema} />
        ))}
      </div>
    </div>
  );
}

const CinemaInfo = ({ cinema }: { cinema: Cinema }) => {
  return (
    <div className="mx-7 sm:mx-20 md:mx-10 lg:mx-20 content-center flex flex-col">
      <div className="head mb-2 pb-3 border-b-4 border-third rounded">
        <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third">
          {cinema.name}
        </h4>
      </div>
      <Link
        href={"/manager/dashboard/showtime"}
        className="w-full bg-third font-inter font-semibold text-xl text-primary mb-4 text-center rounded-lg py-1 mx-4 self-center"
      >
        Add Showtimes
      </Link>

      <div className="flex flex-col gap-4 mt-8 md:mx-4 ">
        {cinema.studios.map((studio) => (
          <div key={studio.id}>
            <div className="w-full bg-secondary font-inter font-semibold text-xl text-fourth mb-4 text-center rounded-lg py-1">
              Studio {studio.number}
            </div>
            <div>
              {studio.showtimes.length === 0 ? (
                <div className="text-center">No shows found</div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {studio.showtimes.map((showtime) => (
                <ShowstudioShowtimes key={showtime.id} showtime={showtime} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShowstudioShowtimes = ({ showtime }: { showtime: Showtimes }) => {
  return (
    <div className="card w-40 lg:w-52 xl:w-64 2xl:w-64 bg-secondary rounded-xl mx-auto my-7">
      <Image
        src={showtime.movie.posterUrl || "/Default Movie Poster.jpg"}
        alt="Poster"
        width={300}
        height={450}
        className="rounded-t-xl h-auto w-[125px] self-center mt-4"
      />
      <div className="card-body">
        <div className="font-inter font-semibold text-2xl text-third">
          {showtime.movie.title}
        </div>
        <div className="info flex-col gap-2 mt-auto">
          <div className="font-medium text-fourth">
            {format(showtime.startTime.toString(), "p")}
          </div>
          <div className="font-medium text-fourth">
            {format(showtime.startTime.toString(), "PP")}
          </div>
        </div>
      </div>
    </div>
  );
};
