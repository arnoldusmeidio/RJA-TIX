"use client";

import { FormProvider, SubmitHandler } from "react-hook-form";
import {
  FormTypeCreateMovie,
  Genre,
  Rated,
  useFormCreateMovie,
} from "./schema/MovieSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateMovieForm() {
  const methods = useFormCreateMovie();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreateMovie> = async (formData) => {
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "posterUrl" && value[0] instanceof File) {
        form.append("image", value[0]);
      } else if (key === "duration" || key === "releaseYear") {
        form.append(key, value.toString());
      } else {
        form.append(key, value as string);
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies`,
        {
          method: "POST",
          body: form,
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
        router.push("/admin/dashboard");
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
            <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third">
              Create a Movie
            </h4>
          </div>
          <div>
            <form
              id="movieForm"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title */}
              <div className="title flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="title"
                  type="text"
                  placeholder="Movie Title"
                  {...methods.register("title")}
                />
                {errors.title && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.title.message}
                  </div>
                )}
              </div>
              {/* Title */}

              {/* Director */}
              <div className="director flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="director"
                >
                  Director
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="director"
                  type="string"
                  placeholder="Director Name"
                  {...methods.register("director")}
                />
                {errors.director && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.director.message}
                  </div>
                )}
              </div>
              {/* Director */}

              {/* Duration */}
              <div className="duration flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="duration"
                >
                  Duration in Minutes
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="duration"
                  type="number"
                  placeholder="Enter the duration"
                  min={0}
                  defaultValue={0}
                  {...methods.register("duration", {
                    setValueAs: (value) => {
                      return value.toString();
                    },
                  })}
                />
                {errors.duration && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.duration.message}
                  </div>
                )}
              </div>
              {/* Duration */}

              {/* Release Year */}
              <div className="release-year flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="releaseDate"
                >
                  Release Year
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="releaseDate"
                  type="number"
                  placeholder="Enter the release year"
                  defaultValue="2024"
                  min={1000}
                  max={9999}
                  {...methods.register("releaseYear", {
                    setValueAs: (value) => {
                      return value.toString();
                    },
                  })}
                />
                {errors.releaseYear && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.releaseYear.message}
                  </div>
                )}
              </div>
              {/* Release Year */}

              {/* Genre */}
              <div className="genre flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <select
                  className="select bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="genre"
                  {...methods.register("genre")}
                >
                  {Object.values(Genre).map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.genre.message}
                  </div>
                )}
              </div>
              {/* Genre */}

              {/* Rated */}
              <div className="rated flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="rated"
                >
                  Rated
                </label>
                <select
                  className="select bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="rated"
                  {...methods.register("rated")}
                >
                  {Object.values(Rated).map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {errors.rated && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.rated.message}
                  </div>
                )}
              </div>
              {/* Rated */}

              {/* Synopsis */}
              <div className="synosis flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-1"
                  htmlFor="synopsis"
                >
                  Synopsis
                </label>
                <textarea
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="synopsis"
                  placeholder="Enter the synopsis"
                  defaultValue="-"
                  {...methods.register("synopsis")}
                />
                {errors.synopsis && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.synopsis.message}
                  </div>
                )}
              </div>
              {/* Synopsis */}

              {/* Poster */}
              <div className="poster flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-2"
                  htmlFor=""
                >
                  Movie Poster
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  {...methods.register("posterUrl")}
                />
                {errors.posterUrl && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.posterUrl.message as string}
                  </div>
                )}
              </div>
              {/* Poster */}
              <button
                className="btn w-full btn-sm font-inter font-semibold bg-third text-primary hover:bg-primary hover:text-third mt-3"
                disabled={isSubmitting}
                type="submit"
                form="movieForm"
              >
                {isSubmitting ? "Loading..." : "Create Movie"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
