import { useMemo, useState } from "react";

import { LoginModal, RegisterModal } from "@/components/auth";
import Image from "next/image";
import { AuthLayout } from "@/components/layouts";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "signup">("login");
  const imageUrl = useMemo(
    () => `/signin${Math.floor(Math.random() * 2)}.png`,
    []
  );
  if (imageUrl === undefined) return <></>
  return (
    <AuthLayout title="UProfes - Ingreso" pageDescription="Ingresa a UProfes o crea una cuenta con tu correo UCAB!">

      <div
        className={`h-full w-1/2 z-20 absolute hidden md:flex justify-center transition-all bg-background-100 duration-700 transform -translate-x-${
          type === "signup" ? "full" : "0"
        } top-0 right-0 sm:overflow-y-auto`}
      >
        <div className="bg-white dark:bg-black h-full w-full relative flex justify-center items-center">
          {/* <img
            src="/login-wallpaper.jpg"
            alt="auth"
            className="h-full w-full object-cover"
          /> */}
          <div className="mx-7">
            <Image
              src={imageUrl}
              priority
              alt="Sticker of a bearded man studying in the park"
              width={500}
              height={500} 
              className="w-full"
            />
          </div>
        </div>
      </div>
      <RegisterModal active={type === "signup"} onTypeChange={setType} />
      <LoginModal active={type === "login"} onTypeChange={setType} />
    </AuthLayout>
  );
};

export default AuthPage;
