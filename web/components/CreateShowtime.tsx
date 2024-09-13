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
    formState: { errors, isSubmitting },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreateShowtime> = async (formData) => {
    console.log(formData);
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/cinemas/studios/showtimes`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //     credentials: "include",
      //   }
      // );
      // const data = await response.json();
      // if (!response.ok) {
      //   if (data.message) {
      //     toast.error(data.message);
      //   } else {
      //     toast.error(data.errors[0].message);
      //   }
      // } else {
      //   toast.success(data.message);
      //   reset();
      //   // router.push("/test-page");
      // }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form id="showtimeForm" onSubmit={handleSubmit(onSubmit)}>
          <SelectMovie />
          <SelectStudio />
          <AddShow />
          <button disabled={isSubmitting} type="submit" form="showtimeForm">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
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
    <div>
      <label htmlFor="movie">Movie</label>
      <select
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

  // console.log(myCinema);
  return (
    <div>
      <label htmlFor="studio">Studio number</label>
      <select
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
      <div className="grid grid-cols-2">
        {fields.map((showtime, showtimeIndex) => (
          <div key={showtime.id}>
            <div key={showtime.id}>
              <input
                type="datetime-local"
                {...register(`showtimes.${showtimeIndex}.time`)}
              />
              {errors.showtimes && (
                <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                  {errors.showtimes.message}
                </div>
              )}
            </div>
            <div>
              <button type="button" onClick={() => remove(showtimeIndex)}>
                Remove show
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={() =>
            append({
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
