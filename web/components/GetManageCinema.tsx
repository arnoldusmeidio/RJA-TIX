"use client";
import { Cinema, Showtimes } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

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
  console.log(myCinema);

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
    <div>
      <div className="text-2xl font-semibold">{cinema.name}</div>
      <div className="text-sm text-gray-600 mt-2">
        Studios: {cinema.studios.length}
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {cinema.studios.map((studio) => (
          <div key={studio.id}>
            <div className="font-light text-xl ">studio {studio.number}</div>

            <div>
              {studio.showtimes.length === 0 ? <div>No shows found</div> : null}
            </div>
            <div className="grid grid-cols-3 gap-3">
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
    <div>
      <div>{format(showtime.startTime.toString(), "p")}</div>
      <div>{format(showtime.startTime.toString(), "PP")}</div>
      <Image
        src={showtime.movie.posterUrl || "/Default Movie Poster.jpg"}
        alt=""
        width={300}
        height={450}
      />
      <div>{showtime.movie.title}</div>
    </div>
  );
};
