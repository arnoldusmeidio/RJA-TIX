"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  dataLength: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  dataLength,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";

  return (
    <div className="flex w-64 lg:w-72 xl:w-64 2xl:w-96 h-full mx-auto items-center justify-center mt-12">
      <button
        className={`${
          !hasPrevPage
            ? "bg-secondary"
            : "bg-third hover:bg-primary hover:text-fourth"
        } py-1 rounded-lg text-black  w-full text-center font-semibold transition-all ease-in-out`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/movies?page=${
              Number(page) - 1
            }&per_page=${per_page}#movie-section`
          );
        }}
      >
        prev page
      </button>

      <div className="w-full text-center">
        {page} / {Math.ceil(dataLength / Number(per_page))}
      </div>

      <button
        className={`${
          !hasNextPage
            ? "bg-secondary"
            : "bg-third hover:bg-primary hover:text-fourth"
        } py-1 rounded-lg text-black  w-full text-center font-semibold transition-all ease-in-out`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/movies?page=${
              Number(page) + 1
            }&per_page=${per_page}#movie-section`
          );
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
