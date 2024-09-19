"use client";

import {
  FormTypeCreatePayment,
  useFormCreatePayment,
} from "@/components/schema/PaymentSchema";
import { AdminVoucher, BookingData } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserStore } from "@/stores/user-store";

export default function page() {
  const [adminVouchers, setAdminVouchers] = useState<AdminVoucher>();
  const searchParams = useSearchParams();
  const passedData = searchParams.get("data");
  const bookingData: BookingData[] = JSON.parse(passedData as string);
  const { user, update } = useUserStore();

  const methods = useFormCreatePayment();
  const {
    handleSubmit,
    reset,
    watch,
    resetField,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const voucher = watch("voucher");
  const point = watch("points");
  const adminVoucherId = watch("adminVoucherId");
  const adminVoucherDiscount = watch("adminVoucherDiscount");
  const voucherId = Number(voucher?.split("-")[0]);
  const voucherValue = Number(voucher?.split("-")[1]);

  const seats = bookingData.map((item) => {
    const container = {} as { row: number; column: number };

    container.row = item.row;
    container.column = item.column;
    return container;
  });
  const studioId = Number(bookingData[0].studioId);
  const movieId = Number(bookingData[0].movieId);
  const showtimeId = Number(bookingData[0].showtimeId);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeCreatePayment> = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            totalPrice,
            seats,
            voucherId,
            studioId,
            movieId,
            showtimeId,
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
        reset();
        router.push("/user/profile");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const adminVoucherParam = adminVoucherId ? adminVoucherId : "-";

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/vouchers/${adminVoucherParam}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAdminVouchers(data.data);
      if (!response.ok) {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error(data.errors[0].message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        update(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const pointsArr = [];
  if (user) {
    let totalPrice = bookingData[0].price * bookingData.length;
    let maxPoints = 0;
    if (user.totalPoints >= totalPrice) {
      maxPoints = totalPrice;
    } else {
      maxPoints = user.totalPoints;
    }

    for (let i = 1; i <= maxPoints / 10000; i++) {
      pointsArr.push(10000 * i);
    }
  }

  let initialPrice = Number(bookingData[0].price) * bookingData.length;
  let totalPrice = initialPrice;

  if (Number(point) && Number(voucherValue) && Number(adminVoucherDiscount)) {
    const priceMinusPoint = initialPrice - Number(point);
    const discountedPrice1 =
      priceMinusPoint -
      ((initialPrice - Number(point)) * Number(voucherValue)) / 100;
    totalPrice =
      discountedPrice1 -
      (discountedPrice1 * Number(adminVoucherDiscount)) / 100;
  } else if (Number(point) && Number(voucherValue)) {
    totalPrice =
      initialPrice -
      Number(point) -
      ((initialPrice - Number(point)) * Number(voucherValue)) / 100;
  } else if (Number(point) && Number(adminVoucherDiscount)) {
    totalPrice =
      initialPrice -
      Number(point) -
      ((initialPrice - Number(point)) * Number(adminVoucherDiscount)) / 100;
  } else if (Number(voucherValue) && Number(adminVoucherDiscount)) {
    totalPrice =
      initialPrice -
      (initialPrice * Number(voucherValue)) / 100 -
      ((initialPrice - (initialPrice * Number(voucherValue)) / 100) *
        Number(adminVoucherDiscount)) /
        100;
  } else if (Number(point)) {
    totalPrice = initialPrice - Number(point);
  } else if (Number(voucherValue)) {
    totalPrice = initialPrice - (initialPrice * Number(voucherValue)) / 100;
  } else if (Number(adminVoucherDiscount)) {
    totalPrice =
      initialPrice - (initialPrice * Number(adminVoucherDiscount)) / 100;
  }

  return (
    <FormProvider {...methods}>
      <div className="card bg-secondary w-3/4 lg:w-2/4 mx-auto my-10">
        <div className="card-body">
          <h2 className="font-inter font-semibold gap-2">
            <div className="text-4xl text-third">Confirm Payment</div>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="point-voucher">
              <form
                id="payment"
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label
                  className="font-inter font-medium text-fourth"
                  htmlFor="points"
                >
                  Points
                </label>
                <select
                  className="select w-full bg-primary border-third focus:border-fourth border-2"
                  defaultValue=""
                  id="points"
                  {...methods.register("points")}
                >
                  {/* logic untuk cek punya point atau tdk*/}
                  {user?.totalPoints === 0 ? (
                    <option value="" disabled hidden>
                      You have no points
                    </option>
                  ) : (
                    <option value="" disabled hidden>
                      Select amount of points to use
                    </option>
                  )}

                  {pointsArr.map((point, idx) => (
                    <option key={idx} value={point}>
                      {`${point} Points`}
                    </option>
                  ))}
                </select>
                {errors.points && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.points.message}
                  </div>
                )}
                <button
                  className="btn btn-sm bg-third font-inter font-semibold text-primary hover:bg-primary hover:text-third w-full"
                  type="button"
                  onClick={() => resetField("points")}
                >
                  Remove points
                </button>

                <label
                  className="font-inter font-medium text-fourth"
                  htmlFor="voucher"
                >
                  Voucher
                </label>
                <select
                  className="select w-full bg-primary border-third focus:border-fourth border-2"
                  defaultValue=""
                  id="voucher"
                  {...methods.register("voucher")}
                >
                  {/* logic untuk cek punya voucher atau tdk*/}
                  {user?.vouchers.length === 0 ? (
                    <option value="" disabled hidden>
                      You have no vouchers
                    </option>
                  ) : (
                    <option value="" disabled hidden>
                      Select voucher
                    </option>
                  )}

                  {user?.vouchers.map((voucher) => (
                    <option
                      key={voucher.id}
                      value={`${voucher.id}-${voucher.discount}`}
                    >
                      {`Discount ${voucher.discount}%`}
                    </option>
                  ))}
                </select>
                {errors.voucher && (
                  <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                    {errors.voucher.message}
                  </div>
                )}
                <button
                  className="btn btn-sm bg-third font-inter font-semibold text-primary hover:bg-primary hover:text-third w-full"
                  type="button"
                  onClick={() => resetField("voucher")}
                >
                  Remove voucher
                </button>

                <div className="flex flex-col">
                  <label
                    className="font-inter font-medium text-fourth mb-2"
                    htmlFor="promoCode"
                  >
                    PROMO CODE
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    className="input input-bordered w-full bg-primary border-third focus:border-fourth border-2 mb-2"
                    placeholder="Type the promo code"
                    {...methods.register("adminVoucherId")}
                  />

                  {/* Tombol untuk cek ketersediaan kode promo*/}
                  <button
                    className="btn btn-sm bg-third font-inter font-semibold text-primary hover:bg-primary hover:text-third w-full"
                    type="button"
                    onClick={handleClick}
                  >
                    Check code
                  </button>

                  {/* Kalau ketemu vouchernya, akan keluar tombol "use discount"*/}
                  {adminVouchers ? (
                    <button
                      className="btn btn-sm mt-2 bg-third font-inter font-semibold text-primary hover:bg-primary hover:text-third w-full"
                      type="button"
                      onClick={() =>
                        setValue(
                          "adminVoucherDiscount",
                          Number(adminVouchers.discount)
                        )
                      }
                    >
                      Use discount {adminVouchers.discount}%
                    </button>
                  ) : null}
                  {errors.adminVoucherDiscount && (
                    <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                      {errors.adminVoucherDiscount.message}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-sm bg-primary font-inter font-semibold text-third hover:bg-third hover:text-primary w-full"
                  onClick={() => {
                    setValue("adminVoucherDiscount", Number(0));
                    resetField("adminVoucherId");
                    setAdminVouchers(undefined);
                  }}
                >
                  Remove voucher
                </button>
              </form>
            </div>
            <div className="seat-payment bg-primary h-fit rounded-lg p-3">
              <h4 className="font-inter font-semibold text-lg text-third">
                Seat Payment:
              </h4>
              <div className="font-inter font-medium text-base">
                Rp.{bookingData[0].price},00 x{" "}
                <span className="text-third">{bookingData.length}</span>
              </div>

              <div className="font-inter font-semibold mt-3">
                Selection Seat:
              </div>
              <div className="flex gap-5">
                {bookingData.map(({ row, column }) => (
                  <div
                    className="font-inter font-medium text-third"
                    key={`${row}-${column}`}
                  >{`${row}.${column}`}</div>
                ))}
              </div>
              <div className="font-inter font-semibold mt-3 text-third">
                Your Balance:
              </div>
              <div className="font-inter font-medium text-base">
                {user ? `Rp.${user?.wallet.balance},00` : `Loading...`}
              </div>
              <div className="mt-3">
                <div className="font-inter font-semibold">Total Payment</div>
                {/* Tampilan harga kalau ada diskon yg valid, maka harga awal akan dicoret, dan harga diskon muncul di bawahnya*/}
                <div
                  className={`${
                    Number(point) ||
                    Number(voucherValue) ||
                    Number(adminVoucherDiscount)
                      ? "line-through"
                      : null
                  }`}
                >
                  Rp.{initialPrice},00
                </div>

                {/* Kalau ada diskon, maka total diskon akan ditampilkan di sini */}
                {Number(point) ||
                Number(voucherValue) ||
                Number(adminVoucherDiscount) ? (
                  <div>{`Rp.${totalPrice},00`}</div>
                ) : null}
              </div>
              {Number(point) ? (
                <div>{`You save ${initialPrice - totalPrice},00`}</div>
              ) : null}
              <button
                disabled={isSubmitting}
                className="btn btn-sm w-full bg-third text-primary hover:bg-primary hover:border-secondary hover:border-2 hover:text-third font-inter font-semibold mt-2"
                type="submit"
                form="payment"
              >
                {isSubmitting ? "LOADING..." : "PAY"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
