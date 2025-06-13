// import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { SignupData } from "../../api/interfaces/auth.types";
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
import type { FieldProps } from "formik";
import { User, Mail, Lock, Globe } from "lucide-react";
import { signupUser } from "@/api/examplePost";
import { toast } from "sonner";
import { getCountries } from "@/api/getCountries";
import React from "react";

const initialValues: SignupData = {
  user_type: "researcher",
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  country: "",
};

const validationSchema = Yup.object({
  user_type: Yup.string().required("User type is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
});

const userTypeOptions = [
  { value: "researcher", label: "Researcher" },
  { value: "investor", label: "Investor" },
  { value: "institution_staff", label: "Institution Staff" },
  { value: "service_provider", label: "Service Provider" },
];

const iconClass =
  "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";
const inputClass =
  "pl-10 h-12 text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400";

const SignUpForm: React.FC = () => {
  const [countries, setCountries] = React.useState<any[]>([]);
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
    { setSubmitting, setStatus }: any
  ) {
    try {
      const res = await signupUser(values);
      setStatus({ success: true });
      console.log("Respuesta de la API:", res);
    } catch (err: any) {
      setStatus({ success: false });
      // Mostrar toast si la API devuelve un error 400 con mensaje
      const apiMsg =
        err?.response?.data?.message || err?.message || "Error inesperado";
      toast.error(apiMsg);
      console.error("Error en signupUser:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-lg text-gray-500">Join AAK Tele-Science today</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, setFieldValue, values }) =>
            status?.success ? (
              <div className="text-center animate-fade-in">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Account Created Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Please check your email to verify your account and activate
                  it.
                </p>
              </div>
            ) : (
              <Form className="space-y-6">
                {/* User Type */}
                <div className="space-y-1">
                  <Label
                    htmlFor="user_type"
                    className="font-semibold text-gray-700"
                  >
                    User Type
                  </Label>
                  <Select
                    value={values.user_type}
                    onValueChange={(value) => setFieldValue("user_type", value)}
                    name="user_type"
                  >
                    <SelectTrigger className="w-full h-12 text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-base"
                        >
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
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <Label
                      htmlFor="first_name"
                      className="font-semibold text-gray-700"
                    >
                      First Name
                    </Label>
                    <User className={iconClass} />
                    <Field name="first_name">
                      {({ field }: FieldProps<SignupData>) => (
                        <Input
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="John"
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="first_name"
                      component="p"
                      className="mt-1 text-xs text-red-600"
                    />
                  </div>
                  <div className="space-y-1 relative">
                    <Label
                      htmlFor="last_name"
                      className="font-semibold text-gray-700"
                    >
                      Last Name
                    </Label>
                    <User className={iconClass} />
                    <Field name="last_name">
                      {({ field }: FieldProps<SignupData>) => (
                        <Input
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="Doe"
                          autoComplete="family-name"
                          className={inputClass}
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
                {/* Username */}
                <div className="space-y-1 relative">
                  <Label
                    htmlFor="username"
                    className="font-semibold text-gray-700"
                  >
                    Username
                  </Label>
                  <User className={iconClass} />
                  <Field name="username">
                    {({ field }: FieldProps<SignupData>) => (
                      <Input
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="johndoe"
                        autoComplete="username"
                        className={inputClass}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1 relative">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Mail className={iconClass} />
                  <Field name="email">
                    {({ field }: FieldProps<SignupData>) => (
                      <Input
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        className={inputClass}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>
                {/* Password */}
                <div className="space-y-1 relative">
                  <Label
                    htmlFor="password"
                    className="font-semibold text-gray-700"
                  >
                    Password
                  </Label>
                  <Lock className={iconClass} />
                  <Field name="password">
                    {({ field }: FieldProps<SignupData>) => (
                      <Input
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputClass}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>
                {/* Country */}
                <div className="space-y-1 relative">
                  <Label
                    htmlFor="country"
                    className="font-semibold text-gray-700"
                  >
                    Country
                  </Label>
                  <Globe className={iconClass} />
                  <Select
                    value={values.country}
                    onValueChange={(value) => setFieldValue("country", value)}
                    name="country"
                    disabled={loadingCountries}
                  >
                    <SelectTrigger className={inputClass + " w-full"}>
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
                        <SelectItem
                          key={country.id}
                          value={country.full_name}
                          className="text-base"
                        >
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
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 mt-[2rem] text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-none"
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
            )
          }
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
