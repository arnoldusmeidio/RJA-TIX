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
    <div>
      <div>
        {!movie ? (
          <div>Invalid Movie ID</div>
        ) : (
          <div>
            <figure>
              <Image
                src={`${movie?.posterUrl || "/Default Movie Poster.jpg"}`}
                width={250}
                height={270}
                alt="Poster Films"
                className="w-full h-full object-cover"
              />
            </figure>
            <div>{movie?.title}</div>
          </div>
        )}
      </div>

      <div>{cinemas?.length === 0 ? <div>No Schedule</div> : null}</div>
      <div className="flex flex-col gap-3">
        {cinemas?.map((cinema) => (
          <CinemaList key={cinema.id} cinema={cinema} />
        ))}
      </div>
    </div>
  );
}

const CinemaList = ({ cinema }: { cinema: Cinema }) => {
  return (
    <div>
      <div className="flex">
        <div className="text-2xl font-semibold">{cinema.name}</div>
        <div className="flex gap-4">
          {cinema.studios.map((studio) => (
            <StudioList key={studio.id} studio={studio} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StudioList = ({ studio }: { studio: Studios }) => {
  return (
    <div>
      {studio.showtimes.length === 0 ? null : (
        <div>
          <div>
            Studio-{studio.number} - {studio.studioType.replace("_", " ")}
          </div>
          {studio.showtimes.map((showtime) => (
            <div key={showtime.id}>
              {/* Link ini href-nya bisa dibuat modal pop-up bisa dibuat page baru */}
              <Link href={`/movies/booking/${showtime.id}`}>
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
