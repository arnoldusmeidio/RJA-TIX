"use client";

import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  FormTypeCreateCinema,
  useFormCreateCinema,
} from "./schema/CinemaSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StudioType } from "./schema/CinemaSchema";
import { Square } from "./Square";
import Grid from "./SeatsGrid";

export const CreateCinema = () => {
  const methods = useFormCreateCinema();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreateCinema> = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/cinemas`,
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
        <div className="card-body">
          <div className="head md:mx-10 mb-2 pb-3 border-b-4 border-third rounded">
            <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third">
              Create a Cinema
            </h4>
          </div>
          <div className="body md:mx-10">
            <form
              id="cinemaForm"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Cinema */}
              <div className="cinema flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-2"
                  htmlFor="cinema"
                >
                  Cinema
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="cinema"
                  type="text"
                  placeholder="Cinema Name"
                  {...methods.register("cinemaName")}
                />
                {errors.cinemaName && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.cinemaName.message}
                  </div>
                )}
              </div>
              {/* Cinema */}

              {/* Manager-ID */}
              <div className="manager-id flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-2"
                  htmlFor="manager"
                >
                  Manager ID
                </label>
                <input
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="manager"
                  type="text"
                  placeholder="Manager ID"
                  {...methods.register("managerId")}
                />
                {errors.managerId && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.managerId.message}
                  </div>
                )}
              </div>
              {/* Manager-ID */}

              {/* Adress */}
              <div className="address flex flex-col mb-4">
                <label
                  className="font-inter font-medium text-xl text-third pb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                  id="address"
                  placeholder="Address"
                  {...methods.register("address")}
                />
                {errors.address && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.address.message}
                  </div>
                )}
              </div>
              {/* Adress */}

              
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">
                <AddStudios />
                <button
                  className="btn btn-sm w-full font-inter font-semibold bg-third text-primary hover:bg-primary hover:text-third rounded-lg"
                  disabled={isSubmitting}
                  type="submit"
                  form="cinemaForm"
                >
                  {isSubmitting ? "Loading..." : "Create Cinema"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </FormProvider>
  );
};

const AddStudios = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateCinema>();

  const { append, remove, fields } = useFieldArray({
    control,
    name: "studios",
  });

  const { studios } = useWatch<FormTypeCreateCinema>();

  return (
    <div>
      {fields.map((item, studioIndex) => {
        return (
          <div key={item.id}>
            <div className="flex mb-3">
              <button
                className="btn btn-sm w-full font-inter font-semibold bg-primary text-third hover:bg-third hover:text-primary"
                type="button"
                onClick={() => remove(studioIndex)}
              >
                Remove screen
              </button>
            </div>

            <div className="border-third border-2 p-5 rounded-lg">
              <label
                className="font-inter font-medium text-lg text-third border-b-4 border-fourth pb-1 rounded"
                htmlFor=""
              >
                Studio {studioIndex + 1}
              </label>

              <div className="flex flex-col mt-5 gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label
                      className="font-inter font-medium text-lg text-third"
                      htmlFor="studioType"
                    >
                      Studio Type
                    </label>
                    <select
                      className="select select-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                      id="studioType"
                      {...register(`studios.${studioIndex}.studioType`)}
                    >
                      {Object.values(StudioType).map((type) => (
                        <option key={type} value={type}>
                          {type.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                    {errors.studios?.[studioIndex]?.studioType && (
                      <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                        {errors.studios?.[studioIndex]?.studioType?.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="font-inter font-medium text-lg text-third"
                      htmlFor=""
                    >
                      Price
                    </label>
                    <input
                      className="input input-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                      type="number"
                      min={0}
                      placeholder="Enter the Price"
                      {...register(`studios.${studioIndex}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.studios?.[studioIndex]?.price && (
                      <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                        {errors.studios?.[studioIndex]?.price?.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label
                      className="font-inter font-medium text-lg text-third"
                      htmlFor="column"
                    >
                      Columns
                    </label>
                    <input
                      className="input input-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                      type="number"
                      id="column"
                      min={0}
                      max={10}
                      placeholder="Enter column numbers"
                      {...register(`studios.${studioIndex}.columns`, {
                        valueAsNumber: true,
                        max: 10,
                      })}
                    />
                    {errors.studios?.[studioIndex]?.columns && (
                      <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                        {errors.studios?.[studioIndex]?.columns?.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="font-inter font-medium text-lg text-third"
                      htmlFor=""
                    >
                      Rows
                    </label>
                    <input
                      className="input input-sm bg-primary border-fourth focus:border-third border-1 rounded-lg"
                      type="number"
                      min={0}
                      max={10}
                      placeholder="Enter row numbers"
                      {...register(`studios.${studioIndex}.rows`, {
                        valueAsNumber: true,
                        max: 10,
                      })}
                    />
                    {errors.studios?.[studioIndex]?.rows && (
                      <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                        {errors.studios?.[studioIndex]?.rows?.message}
                      </div>
                    )}
                  </div>
                </div>

                <Grid
                  rows={studios?.[studioIndex]?.rows || 0}
                  columns={studios?.[studioIndex]?.columns || 0}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-center">
        <button
          className="btn w-full btn-sm btn-ghost font-inter font-semibold"
          type="button"
          onClick={() =>
            append({
              rows: 0,
              columns: 0,
              price: 30000,
              studioType: StudioType.starium,
            })
          }
        >
          Add screen
        </button>
      </div>
    </div>
  );
};
