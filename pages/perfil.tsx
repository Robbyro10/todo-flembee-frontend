import { AppLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppLayout
      title="TooDoo - Perfil"
      pageDescription="Informacion de perfil de tu cuenta en TooDoo"
    >
      <div className="max-w-screen-lg mx-auto px-5 mt-2">
        <Link
          href="/"
          className="text-primary hover:underline w-fit flex gap-1 items-center mt-5"
        >
          <AiOutlineLeft />
          Volver
        </Link>

        {user ? (
          <>
            <div className="mt-5 flex gap-3 items-baseline mb-5">
              <h1 className="text-primary font-bold text-3xl">Tu Perfil</h1>
              {user.role === "admin" && (
                <p className=" text-neutral">Administrador</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold -mb-2">Nombre</h2>
              <div className="flex gap-5">
                <p className="w-fit">{user.fullName}</p>
              </div>
              <div className="flex items-center">
                <div>
                  <h2 className="text-lg font-bold">Correo</h2>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Registrate bro</h1>
        )}
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
