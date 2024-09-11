import { FormProvider } from "react-hook-form";
import { useFormCreateMovie } from "./schema/MovieSchema";

export default function CreateMovieForm() {
  const methods = useFormCreateMovie();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <div>CreateMovieForm</div>
    </FormProvider>
  );
}
