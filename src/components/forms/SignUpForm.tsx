// import React, { useState } from "react";
import { toast } from "sonner";
import React from "react";
import { getCountries } from "@/api/getCountries";
import { signupUser } from "@/api/examplePost";
import type { SignupData } from "@/api/interfaces/auth.types";
import { SignUpFormSkeleton } from "./SignUpFormSkeleton";
import type { FormikHelpers } from "formik";

const SignUpForm: React.FC = () => {
  const [countries, setCountries] = React.useState<{ id: string; full_name: string; flag_shape?: string }[]>([]);
  const [loadingCountries, setLoadingCountries] = React.useState(true);

  React.useEffect(() => {
    getCountries()
      .then((data) => {
        setCountries(data.results);
      })
      .catch((err) => {
        setCountries([]);
        console.error("Error al cargar países:", err);
      })
      .finally(() => setLoadingCountries(false));
  }, []);

  async function handleSubmit(
    values: SignupData,
    formikHelpers: FormikHelpers<SignupData>
  ) {
    try {
      const res = await signupUser(values);
      formikHelpers.setStatus({ success: true });
      toast.success("User created successfully! Please check your email to verify your account.");
      console.log("Respuesta de la API:", res);
    } catch (err) {
      // err puede ser unknown, así que lo tipamos correctamente
      const apiMsg =
        (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data)
          ? (err.response.data as { message?: string }).message || "Unexpected error"
          : err instanceof Error
            ? err.message
            : "Unexpected error";
      formikHelpers.setStatus({ success: false });
      toast.error(apiMsg);
      console.error("Error en signupUser:", err);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  }

  return (
    <SignUpFormSkeleton
      countries={countries}
      loadingCountries={loadingCountries}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpForm;
