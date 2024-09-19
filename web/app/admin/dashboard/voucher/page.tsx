"use client";

import {
  FormTypeCreateVoucher,
  useFormCreateVoucher,
} from "@/components/schema/VoucherSchema";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function Voucher() {
  const methods = useFormCreateVoucher();
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreateVoucher> = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/vouchers`,
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
    <div className="py-10">
      <div className="card bg-secondary text-neutral-content w-4/5 lg:w-2/4 mx-auto my-10">
        <div className="card-body">
          <div className="head md:mx-10 mb-2 pb-3 border-b-4 border-third rounded">
            <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third">
              Create a Voucher
            </h4>
          </div>
          <div className="body md:mx-10">
            <FormProvider {...methods}>
              <form
                id="voucher"
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Voucher Id */}
                <div className="voucher flex flex-col mb-4">
                  <label
                    className="font-inter font-medium text-xl text-third pb-2"
                    htmlFor="voucherId"
                  >
                    Voucher ID
                  </label>
                  <input
                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                    id="voucherId"
                    type="text"
                    placeholder="Voucher ID"
                    {...methods.register("voucherId")}
                  />
                  {errors.voucherId && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.voucherId.message}
                    </div>
                  )}
                </div>
                {/* Voucher Id */}

                {/* Discount */}
                <div className="discount flex flex-col mb-4">
                  <label
                    className="font-inter font-medium text-xl text-third pb-2"
                    htmlFor="discount"
                  >
                    Discount
                  </label>
                  <input
                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                    id="discount"
                    type="text"
                    placeholder="Discount"
                    {...methods.register("discount")}
                  />
                  {errors.voucherId && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.voucherId.message}
                    </div>
                  )}
                </div>
                {/* Discount */}

                {/* Availability */}
                <div className="availability flex flex-col mb-4">
                  <label
                    className="font-inter font-medium text-xl text-third pb-2"
                    htmlFor="availability"
                  >
                    Availability
                  </label>
                  <input
                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                    id="availability"
                    type="text"
                    placeholder="Availability"
                    {...register("availability")}
                  />
                  {errors.availability && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.availability.message}
                    </div>
                  )}
                </div>
                {/* Availability */}

                {/* Expiration Date */}
                <div className="expired flex flex-col mb-4">
                  <label
                    className="font-inter font-medium text-xl text-third pb-2"
                    htmlFor="expiredAt"
                  >
                    Expired
                  </label>
                  <input
                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                    type="date"
                    id="expiredAt"
                    {...methods.register("expiredAt")}
                  />
                  {errors.expiredAt && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.expiredAt.message}
                    </div>
                  )}
                </div>
                {/* Expiration Date */}

                <button
                  className="btn btn-md w-full font-inter font-semibold text-base bg-third text-primary hover:bg-primary hover:text-third rounded-lg"
                  type="submit"
                  form="voucher"
                >
                  {isSubmitting ? "Loading..." : "Create Voucher"}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
