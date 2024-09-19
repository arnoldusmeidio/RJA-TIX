"use client";

import { Movie } from "@/types";
import {
  FormTypeCreateReview,
  useFormCreateReview,
} from "./schema/Review.schema";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  movieData: Movie;
  idx: number;
};

export default function ReviewModal({ movieData, idx }: Props) {
  const methods = useFormCreateReview();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const router = useRouter();
  const movieId = movieData.id;

  const onSubmit: SubmitHandler<FormTypeCreateReview> = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/movies/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            movieId,
          }),
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
        router.push("/user/profile");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form id={`review-${idx + 1}`} onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor={`review-tab-${idx + 1}`}
          role="button"
          tabIndex={0}
          className="btn w-[150px] bg-third text-primary font-semibold hover:bg-primary hover:text-third transition-all ease-in-out"
        >
          {movieData?.reviews.length !== 0 ? "Your Review" : "Write a Review"}
        </label>
        <input
          type="checkbox"
          id={`review-tab-${idx + 1}`}
          className="modal-toggle"
        />
        <div className="modal bg-secondary" role="dialog">
          <div className="modal-box h-3/3">
            <h3 className="text-center md:text-start text-2xl font-semibold text-third">
              {movieData.title}
            </h3>
            <div className="py-4">
              <p className="text-center md:text-start text-lg font-medium text-fourth font-lato mb-2">
                Rate Film
              </p>
              <input
                disabled={
                  movieData?.reviews
                    ? movieData?.reviews.length !== 0
                      ? true
                      : false
                    : false
                }
                id={`review-star-${idx + 1}`}
                {...methods.register("star")}
                type="range"
                min={1}
                max={5}
                step={1}
                defaultValue={
                  movieData?.reviews.length !== 0
                    ? movieData.reviews[0].star
                    : 3
                }
                className="range range-warning range-xs"
              />
              {errors.star && (
                <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                  {errors.star.message}
                </div>
              )}
              <div className="flex w-full justify-between px-2 text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                disabled={
                  movieData?.reviews
                    ? movieData?.reviews.length !== 0
                      ? true
                      : false
                    : false
                }
                id={`review-text-${idx + 1}`}
                {...methods.register("review")}
                rows={3}
                className="textarea textarea-bordered"
                // placeholder="Your review"
                placeholder={
                  movieData?.reviews
                    ? movieData?.reviews.length !== 0
                      ? movieData?.reviews[0]?.review
                      : "Your review"
                    : "Your review"
                }
              ></textarea>
              {errors.review && (
                <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                  {errors.review.message}
                </div>
              )}
            </div>
            <div className="modal-action pt-auto">
              <button
                disabled={
                  movieData?.reviews
                    ? movieData?.reviews.length !== 0
                      ? true
                      : false
                    : false
                }
                type="submit"
                form={`review-${idx + 1}`}
                className="btn bg-third text-primary hover:bg-primary hover:text-third"
              >
                Submit
              </button>
              <label
                htmlFor={`review-tab-${idx + 1}`}
                className="btn bg-primary text-third hover:bg-third hover:text-primary"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
