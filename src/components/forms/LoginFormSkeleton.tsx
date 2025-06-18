import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { FieldProps } from "formik";

const validationSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const initialValues = {
  username: "",
  password: "",
};

const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="m-[2rem]">
    <div className="text-[1.5rem] font-semibold text-gray-900 dark:text-white">
      {children}
    </div>
  </div>
);

export interface LoginFormSkeletonProps {
  onSubmit: (
    values: typeof initialValues,
    formikHelpers: import("formik").FormikHelpers<typeof initialValues>
  ) => void | Promise<void>;
}

export function LoginFormSkeleton({ onSubmit }: LoginFormSkeletonProps) {
  return (
    <div
      className="border rounded-lg bg-background p-[2rem] max-w-md mx-auto"
      style={{ border: "1px solid var(--border)" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="h-full flex flex-col items-center m-[2rem]">
            <FormTitle>Login</FormTitle>
            <div className="space-y-6">
              <div className="space-y-4 max-w-xs mx-auto">
                <Label htmlFor="username" className="text-base">
                  Nombre de usuario
                </Label>
                <Field name="username">
                  {({ field }: FieldProps<typeof initialValues>) => (
                    <Input
                      id="username"
                      name={field.name}
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder=" johndoe123"
                      autoComplete="username"
                      required
                      className="w-full"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="username"
                  component="p"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
              <div className="space-y-4 max-w-xs mx-auto">
                <Label htmlFor="password" className="text-base">
                  Contraseña
                </Label>
                <Field name="password">
                  {({ field }: FieldProps<typeof initialValues>) => (
                    <Input
                      id="password"
                      name={field.name}
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      type="password"
                      placeholder=" ••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-[2rem] max-w-xs mx-auto p-[0.4rem]"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
