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
          id="cinemaForm"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="cinema">Cinema</label>
          <input
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
          <label htmlFor="manager">Manager ID</label>
          <input
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
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            placeholder="Address"
            {...methods.register("address")}
          />
          {errors.address && (
            <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
              {errors.address.message}
            </div>
          )}
          <AddStudios />
          <button disabled={isSubmitting} type="submit" form="cinemaForm">
            {" "}
            {isSubmitting ? "Loading..." : "Create Cinema"}
          </button>
        </form>
      </div>
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
            <div className="flex justify-end">
              <button type="button" onClick={() => remove(studioIndex)}>
                Remove screen
              </button>
            </div>

            <label htmlFor="">Studio {studioIndex + 1}</label>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label htmlFor="studioType">Studio Type</label>
                  <select
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
                  <label htmlFor="">Price</label>
                  <input
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
                  <label htmlFor="column">Columns</label>
                  <input
                    type="number"
                    id="column"
                    min={0}
                    placeholder="Enter column numbers"
                    {...register(`studios.${studioIndex}.columns`, {
                      valueAsNumber: true,
                    })}
                  />
                  {errors.studios?.[studioIndex]?.columns && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.studios?.[studioIndex]?.columns?.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Rows</label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter row numbers"
                    {...register(`studios.${studioIndex}.rows`, {
                      valueAsNumber: true,
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
        );
      })}
      <div className="flex justify-end">
        <button
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

export const Grid = ({ rows, columns }: { rows: number; columns: number }) => {
  const renderRows = () => {
    const rowElements = [];

    for (let i = 0; i < rows; i++) {
      const columnElements = [];
      for (let j = 0; j < columns; j++) {
        columnElements.push(<Square key={`${i}-${j}`} />);
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-2">
          {columnElements}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return <div className="w-full ">{renderRows()}</div>;
};
