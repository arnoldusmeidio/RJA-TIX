"use client";

import { CreateCinema } from "@/components/CreateCinema";
import { FormProvideCreateCinema } from "@/components/schema/CinemaSchema";

export default function Page() {
  return (
    <>
      <FormProvideCreateCinema>
        <CreateCinema />
      </FormProvideCreateCinema>
    </>
  );
}
