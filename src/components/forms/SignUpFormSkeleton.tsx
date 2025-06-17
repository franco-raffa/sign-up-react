import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SignupData } from "@/api/interfaces/auth.types";
import type { FieldProps } from "formik";

export const validationSchema = Yup.object({
  user_type: Yup.string().required("User type is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
  country: Yup.string().required("Country is required"),
});

export interface SignUpFormSkeletonProps {
  countries: Array<{ id: string; full_name: string; flag_shape?: string }>;
  loadingCountries: boolean;
  onSubmit: (
    values: SignupData,
    formikHelpers: import("formik").FormikHelpers<SignupData>
  ) => void | Promise<void>;
}

const initialValues: SignupData & { confirm_password: string } = {
  user_type: "researcher",
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  country: "",
  confirm_password: "",
};

const userTypeOptions = [
  { value: "researcher", label: "Researcher" },
  { value: "investor", label: "Investor" },
  { value: "institution_staff", label: "Institution Staff" },
  { value: "service_provider", label: "Service Provider" },
];

const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="text-[1.5rem] font-semibold text-gray-900 dark:text-white">
      {children}
    </div>
  </div>
);

export function SignUpFormSkeleton({
  countries,
  loadingCountries,
  onSubmit,
}: SignUpFormSkeletonProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="w-full h-full flex flex-col">
          <FormTitle>Sign Up</FormTitle>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="user_type" className="text-base">
                User Type
              </Label>
              <Select
                value={values.user_type}
                onValueChange={(value) => setFieldValue("user_type", value)}
                name="user_type"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  {userTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                name="user_type"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-4">
                <Label htmlFor="first_name" className="text-base">
                  First Name
                </Label>
                <Field name="first_name">
                  {({ field }: FieldProps<SignupData>) => (
                    <Input
                      id="first_name"
                      name={field.name}
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="John"
                      autoComplete="given-name"
                      required
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="first_name"
                  component="p"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="last_name" className="text-base">
                  Last Name
                </Label>
                <Field name="last_name">
                  {({ field }: FieldProps<SignupData>) => (
                    <Input
                      id="last_name"
                      name={field.name}
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Doe"
                      autoComplete="family-name"
                      required
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="last_name"
                  component="p"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Field name="username">
                {({ field }: FieldProps<SignupData>) => (
                  <Input
                    id="username"
                    name={field.name}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="johndoe123"
                    autoComplete="username"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                name="username"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Field name="email">
                {({ field }: FieldProps<SignupData>) => (
                  <Input
                    id="email"
                    name={field.name}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="email"
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Field name="password">
                {({ field }: FieldProps<SignupData>) => (
                  <Input
                    id="password"
                    name={field.name}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="confirm_password" className="text-base">
                Confirm Password
              </Label>
              <Field name="confirm_password">
                {({ field }: FieldProps<SignupData>) => (
                  <Input
                    id="confirm_password"
                    name={field.name}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirm_password"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="country" className="text-base">
                Country
              </Label>
              <Select
                value={values.country}
                onValueChange={(value) => setFieldValue("country", value)}
                name="country"
                disabled={loadingCountries}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingCountries
                        ? "Loading countries..."
                        : "Select your country"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.full_name}>
                      {country.flag_shape} {country.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                name="country"
                component="p"
                className="mt-1 text-xs text-red-600"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-8 w-full p-[0.4rem]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
