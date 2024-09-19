"use client";

import { useEffect, useState } from "react";
import { LuArmchair } from "react-icons/lu";

export default function ShowRemainingSeats({
  params,
}: {
  params: { id: string };
}) {
  const [seat, setSeat] = useState<{ total: number; booked: number }>();

  useEffect(() => {
    async function getSeat() {
      try {
        const seats = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/showtimes/search/${params.id}`,
          {
            credentials: "include",
          }
        );
        const data = await seats.json();
        setSeat(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getSeat();
  }, []);

  const totalSeats = seat?.total || 0;
  const bookedSeat = seat?.booked || 0;
  const remainingSeats = totalSeats - bookedSeat;

  return (
    <div className="w-full h-full bg-primary mb-2 py-10">
      {/* Komponen untuk menunjukan kursi yg tersedia pada showtime */}
      <div className="lg:flex items-center content-center justify-center md:justify-start mx-7 sm:mx-20 md:mx-10 lg:mx-40 pb-3 gap-2 font-inter font-semibold text-2xl text-third border-b-4 border-third rounded">
        <div className="inline-flex items-center w-full text-center lg:text-start justify-center lg:justify-start">
          <h5 className="md:flex">Seats available:<span className="text-fourth">{remainingSeats}</span> / <span className="text-fourth">{totalSeats}</span></h5>
          <LuArmchair className="ms-1" />
        </div>
        <div className="info items-center w-full text-center lg:text-end lg:ms-auto mt-auto">
          <div className="inline-flex gap-2">
            <div className="bg-fourth w-5 transition-all h-5 border border-black/50 rounded-t-lg shadow-md"></div>
            <p className="font-inter font-semibold text-sm">Empty Seat</p>
          </div>
          <div className="inline-flex gap-2 mx-4">
            <div className="bg-third w-5 transition-all h-5 border border-black/50 rounded-t-lg shadow-md"></div>
            <p className="font-inter font-semibold text-sm">Selected Seat</p>
          </div>
          <div className="inline-flex gap-2">
            <div className="bg-red-600 w-5 transition-all h-5 border border-black/50 rounded-t-lg shadow-md"></div>
            <p className="font-inter font-semibold text-sm">Booked Seat</p>
          </div>
        </div>
      </div>
    </div>
  );
}
