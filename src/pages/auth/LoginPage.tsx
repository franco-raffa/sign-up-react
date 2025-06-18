import React from "react";
import { LoginFormSkeleton } from "@/components/forms/LoginFormSkeleton";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  function handleSubmit(values: { username: string; password: string }) {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (
      values.username === storedUsername &&
      values.password === storedPassword
    ) {
      toast.success("¡Login exitoso!");
      navigate("/success");
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
  }

  return (
    <div className="items-center justify-center min-h-screen">
      <div className="w-full h-full flex flex-col">
        <LoginFormSkeleton onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
