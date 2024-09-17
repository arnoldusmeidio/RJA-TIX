"use client";

import { Seat, SeatInfo } from "@/types";
import { useEffect, useState } from "react";
import { Square } from "./Square";
import { useSeatSelection } from "@/utils/hooks";
import SeatNumber from "./SeatNumber";
import Link from "next/link";

const groupSeatsByRow = (seats: Seat[]): Record<number, Seat[]> => {
  return seats.reduce((acc: Record<number, Seat[]>, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
};

export default function SelectSeats({ params }: { params: { id: string } }) {
  const [seat, setSeat] = useState<SeatInfo>();

  useEffect(() => {
    async function getSeat() {
      try {
        const seats = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/showtimes/search/seats/${params.id}`,
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

  const rows = groupSeatsByRow(seat?.seats || []) || [];

  const {
    state: { selectedSeats },
    toggleSeat,
    resetSeats,
  } = useSeatSelection();

  return (
    <div className="h-full py-4">
      {/* Rendering row dan kolom kursi */}
      <div>
        <div className="bg-red-500 p-1 rounded mb-5">
          <h6 className="font-inter text-fourth font-semibold uppercase text-center">Screen</h6>
        </div>
        {Object.entries(rows).map(([rowNumber, seatsInRow]) => (
          <div className="flex gap-2 mb-2" key={rowNumber}>
            {seatsInRow.map((seat) => (
              <button
                key={`${seat.row}-${seat.column}`}
                disabled={Boolean(seat?.booked)}
                onClick={() => {
                  toggleSeat(seat);
                }}
              >
                <Square
                  key={`${seat.row}-${seat.column}`}
                  booked={Boolean(seat?.booked)}
                  selected={Boolean(
                    selectedSeats?.find(
                      (selectedSeats) =>
                        seat.column === selectedSeats.column &&
                        seat.row === selectedSeats.row
                    )
                  )}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Menunjukan kursi yg dipilih */}
      <div>
        {selectedSeats.length ? (
          <div>
            <div>Seats:</div>
            <div className="flex gap-3">
              {selectedSeats.map(({ row, column }) => (
                <SeatNumber
                  key={`${row}-${column}`}
                  row={row}
                  column={column}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Reset button untuk menghilangkan semua pilihan kursi */}
      <div className="flex gap-3 mt-7">
        <button className="btn btn-sm bg-third font-lato font-semibold text-primary hover:text-third hover:bg-primary" type="button" onClick={() => resetSeats()}>
          Reset
        </button>
        {selectedSeats.length ? (
          <Link
            href={{
              pathname: `/movies/${params.id}/booking/checkout`,
              query: {
                data: JSON.stringify(
                  selectedSeats.map(({ row, column }) => ({
                    row,
                    column,
                    studioId: seat?.studioId,
                    price: seat?.price || 0,
                    movieId: seat?.movieId,
                    movieTitle: seat?.movieTitle,
                    studioType: seat?.studioType,
                    showtimeId: Number(params.id),
                  }))
                ),
              },
            }}
          >
            <button className="btn btn-sm bg-secondary font-lato font-semibold text-third hover:text-primary hover:bg-third">Confirm</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
