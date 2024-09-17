"use client";

import { Movie } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDebounce } from "use-debounce";

function Searchbar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [debouncedValue] = useDebounce(query, 500);

  useEffect(() => {
    async function getResults() {
      try {
        const movies = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies/search?text=${debouncedValue}`
        );
        const data = await movies.json();
        setResults(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getResults();
  }, [debouncedValue]);

  return (
    <div className="dropdown dropdown-end">
      <label
        htmlFor="search-modal"
        role="button"
        tabIndex={0}
        className="btn btn-ghost btn-circle"
      >
        <div className="indicator">
          <IoMdSearch className="h-5 w-5" />
        </div>
      </label>
      {/* Modal */}
      <input type="checkbox" id="search-modal" className="modal-toggle" />
      <div
        className="modal animate__animated animate__fadeInUpBig"
        role="dialog"
      >
        <div className="modal-box w-11/12 max-w-2xl h-5/6 max-h-full">
          <div className="form-control">
            <span className="label-text font-medium font-lato text-fourth tracking-wide pb-2">
              What movie would you like to watch?
            </span>
            <div className="search flex gap-3">
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                placeholder="Search Movie or Director Name"
                className="input input-bordered font-montserrat rounded-xl w-full placeholder:hover:translate-x-1 placeholder:transition-all placeholder:ease-in-out"
              />
              <button className="btn bg-primary border-0 w-12 hover:text-third">
                <IoMdSearch className="h-full w-full" />
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="recent">
            <span className="label-text text-base">Results</span>
            <div className="grid grid-flow-row gap-4">
              {/* Map the search result */}
              {results?.map((movies) => (
                <div
                  key={movies.id}
                  className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-all ease-in"
                >
                  <div className="card-body max-h-full">
                    <div className="heading sm:inline-flex">
                      <h3 className="card-title text-base">{movies.title}</h3>
                      <h4 className="text-base ms-auto">
                        <span className="badge badge-base badge-ghost bg-third text-primary font-medium">
                          {movies.rated.replace("_", " ")}
                        </span>
                      </h4>
                    </div>
                    <p className="text-justify font-montserrat truncate">
                      Director: {movies.director}
                    </p>
                    <Link
                      href={`/movies/${movies.id}`}
                      className="btn hover:text-third mt-auto"
                    >
                      See Movies
                    </Link>
                  </div>
                </div>
              ))}

              {/* Map the search result */}
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="search-modal">
          Close
        </label>
      </div>
      {/* Modal */}
    </div>
  );
}
export default Searchbar;
