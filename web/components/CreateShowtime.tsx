"use client";

import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  FormTypeCreateShowtime,
  useFormCreateShowtime,
} from "./schema/ShowtimeSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Cinema, Movie, Studios } from "@/types";

export default function CreateShowtime() {
  const methods = useFormCreateShowtime();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreateShowtime> = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/showtimes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error(data.errors[0].message);
        }
      } else {
        toast.success(data.message);
        reset();
        router.push("/manager/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="card bg-secondary text-neutral-content w-4/5 lg:w-2/4 mx-auto my-10">
        <div className="card-body md:mx-10">
          <div className="head mb-2 pb-3 border-b-4 border-third rounded">
            <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third ">
              Create a Movie
            </h4>
          </div>
          <form id="showtimeForm" onSubmit={handleSubmit(onSubmit)}>
            <SelectMovie />
            <SelectStudio />
            <AddShow />
            <button
              className="btn w-full btn-sm font-inter font-semibold bg-third text-primary hover:bg-primary hover:text-third mt-3"
              disabled={isSubmitting}
              type="submit"
              form="showtimeForm"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

const SelectMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeCreateShowtime>();

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

  return (
    <div className="flex flex-col mb-4">
      <label
        className="font-inter font-medium text-xl text-third pb-1"
        htmlFor="movie"
      >
        Movie
      </label>
      <select
        className="select bg-primary border-fourth focus:border-third border-1 rounded-lg"
        defaultValue=""
        id="movie"
        onChange={(e) => setValue("movieId", Number(e.target.value))}
      >
        {movies?.length === 0 ? (
          <option value="" disabled hidden>
            Loading...
          </option>
        ) : (
          <option value="" disabled hidden>
            Select a movie...
          </option>
        )}

        {movies?.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>
      {errors.movieId && (
        <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
          {errors.movieId.message}
        </div>
      )}
    </div>
  );
};

const SelectStudio = () => {
  const [myCinema, setMyCinema] = useState<Cinema[]>([]);

  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeCreateShowtime>();

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
    <div className="flex flex-col mb-4">
      <label
        className="font-inter font-medium text-xl text-third pb-1"
        htmlFor="studio"
      >
        Studio number
      </label>
      <select
        className="select bg-primary border-fourth focus:border-third border-1 rounded-lg"
        defaultValue=""
        id="studio"
        onChange={(e) => setValue("studioId", Number(e.target.value))}
      >
        {myCinema?.length === 0 ? (
          <option value="" disabled hidden>
            Loading...
          </option>
        ) : (
          <option value="" disabled hidden>
            Select a studio...
          </option>
        )}

        {myCinema[0]?.studios.map((studio) => (
          <option key={studio.id} value={studio.id}>
            {myCinema[0].name} - {studio.number}
          </option>
        ))}
      </select>
      {errors.studioId && (
        <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
          {errors.studioId.message}
        </div>
      )}
    </div>
  );
};

const AddShow = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateShowtime>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "showtimes",
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {fields.map((showtime, showtimeIndex) => (
          <div className="mx-auto" key={showtime.id}>
            <label
              className="font-inter font-medium text-xl text-third pb-1"
              htmlFor="date"
            >
              Date and time
            </label>
            <div className="flex gap-2">
              <input
                className="input input-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                type="date"
                id="date"
                {...register(`showtimes.${showtimeIndex}.date`)}
              />
              <select
                className="select select-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                id="time"
                {...register(`showtimes.${showtimeIndex}.time`)}
              >
                <option disabled selected>
                  Pick a Time
                </option>
                <option value="T06:00">06.00 AM</option>
                <option value="T09:00">09.00 AM</option>
                <option value="T12:00">12.00 PM</option>
                <option value="T15:00">15.00 PM</option>
                <option value="T18:00">18.00 PM</option>
                <option value="T21:00">21.00 PM</option>
              </select>
            </div>
            {errors.showtimes?.[showtimeIndex]?.date && (
              <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                {errors.showtimes?.[showtimeIndex]?.date.message}
              </div>
            )}
            {errors.showtimes?.[showtimeIndex]?.time && (
              <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                {errors.showtimes?.[showtimeIndex]?.time.message}
              </div>
            )}
            <div>
              <button
                className="btn w-full btn-sm font-inter font-semibold bg-third text-primary hover:bg-primary hover:text-third mt-3"
                type="button"
                onClick={() => remove(showtimeIndex)}
              >
                Remove show
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn w-full btn-sm btn-ghost font-inter font-semibold mt-3"
          type="button"
          onClick={() =>
            append({
              date: "",
              time: "",
            })
          }
        >
          Add show
        </button>
      </div>
    </div>
  );
};
