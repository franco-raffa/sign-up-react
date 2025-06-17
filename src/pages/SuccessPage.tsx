import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Login exitoso!</h1>
      <p className="text-muted-foreground">
        Bienvenido, has iniciado sesión correctamente.
      </p>
    </div>
  );
};

export default SuccessPage;
