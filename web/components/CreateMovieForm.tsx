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
        // router.push("/test-page");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form
          id="movieForm"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="title">Title</label>
          <input
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
          <label htmlFor="director">Director</label>
          <input
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
          <label htmlFor="duration">Duration in Minutes</label>
          <input
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
          <label htmlFor="releaseDate">Release Year</label>
          <input
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
          <label htmlFor="genre">Genre</label>
          <select id="genre" {...methods.register("genre")}>
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
          <label htmlFor="rated">Rated</label>
          <select id="rated" {...methods.register("rated")}>
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
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
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
          <label htmlFor="">Movie Poster</label>
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
          {/* <button
            type="button"
            onClick={() => {
              methods.resetField("posterUrl");
            }}
          >
            Remove File
          </button> */}

          <button disabled={isSubmitting} type="submit" form="movieForm">
            {isSubmitting ? "Loading..." : "Create Movie"}
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
