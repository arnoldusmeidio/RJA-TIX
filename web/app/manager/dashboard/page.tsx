"use client";

import GetManageCinema from "@/components/GetManageCinema";
import { Cinema } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Manager() {
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
    <main className="bg-primary">
      {/* Head SuperAdmin */}
      <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded">
        <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
          Dashboard Manager
        </h4>
      </section>
      {/* Head SuperAdmin */}

      {/* Count Dashboard */}
      <section className="count content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-7 mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {myCinema[0]?.name}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Your Cinema
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {myCinema[0]?.studios.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Total Number of Studios
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {myCinema[0]?.studios.reduce(
                  (acc, curr) => acc + curr.showtimes.length,
                  0
                )}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Showtimes
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Count Dashboard */}
      <section>
        <GetManageCinema />
      </section>
    </main>
  );
}
