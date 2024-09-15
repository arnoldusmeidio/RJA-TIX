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
    <div>
      <div className="flex items-center gap-2">
        Seats available: {remainingSeats}/{totalSeats}
        <LuArmchair />
      </div>
    </div>
  );
}
