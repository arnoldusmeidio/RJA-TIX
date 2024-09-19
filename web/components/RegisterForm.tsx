"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormRegister, FormTypeRegister } from "./schema/AuthSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useFormRegister();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormTypeRegister> = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/register`,
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
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        id="registerForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex-row md:inline-flex md:gap-12 lg:gap-10">
          <div className="name grid grid-row gap-2">
            <label
              htmlFor="name"
              className="label-text font-semibold text-fourth align-middle text-base ms-2"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Type your name"
              name="name"
              id="name"
              className="input input-bordered w-full md:w-80 lg:w-64 bg-secondary border-fourth focus:border-third border-2"
            />
            {errors.name && (
              <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="phone grid grid-row gap-2">
            <label
              htmlFor="referralCode"
              className="label-text font-semibold text-fourth align-middle text-base ms-2"
            >
              Referral Code
            </label>
            <input
              {...register("referralCode")}
              type="text"
              placeholder="Type the referral code"
              name="referralCode"
              id="referralCode"
              className="input input-bordered w-full lg:w-64 bg-secondary border-fourth focus:border-third border-2"
            />
            {errors.name && <div className="md:h-6"></div>}
          </div>
        </div>
        <div className="email grid grid-row gap-2">
          <label
            htmlFor="email"
            className="label-text font-semibold text-fourth align-middle text-base ms-2"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Type your email address"
            name="email"
            id="email"
            className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2"
          />
        </div>
        {errors.email && (
          <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
            {errors.email.message}
          </div>
        )}
        <div className="pass grid grid-row gap-2">
          <label
            htmlFor="password"
            className="label-text font-semibold text-fourth align-middle text-base ms-2"
          >
            Create Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Type your new password"
            name="password"
            id="password"
            className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2"
          />
          {errors.password && (
            <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="con-pass grid grid-row gap-2">
          <span className="label-text font-semibold text-fourth align-middle text-base ms-2">
            Confirm Password
          </span>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Type again your password"
            className="input input-bordered w-full lg:w-4/5 bg-secondary border-fourth focus:border-third border-2"
          />
          {errors.confirmPassword && (
            <div className="text-red-500 label-text font-normal align-middle text-base ms-2">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
      </form>
      <button
        disabled={isSubmitting}
        type="submit"
        form="registerForm"
        className="btn w-full lg:w-4/5 bg-third hover:bg-secondary mt-20 font-semibold text-base text-primary hover:text-white"
      >
        {isSubmitting ? "Loading..." : "Register Account"}
      </button>
    </>
  );
}
