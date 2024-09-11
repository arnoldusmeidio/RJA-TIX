"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  director: string;
  posterUrl: any;
  rated: string;
  releaseYear: number;
  synopsis: string;
}

export default function TestPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies`
        );
        const data = await movie.json();
        setMovies(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovies();
  }, []);

  console.log(movies);

  return (
    <main>
      <section className="w-full h-full bg-primary md:p-20">
        <div className="grid grid-cols-5">
          {movies?.map((item, idx: number) => (
            <div key={idx}>
              <div>
                <Image
                  src={`${item.posterUrl || "/Default Movie Poster.jpg"}`}
                  alt=""
                  width={300}
                  height={450}
                />
                <p>Title: {item.title}</p>
                <p>Director: {item.director}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
