import { FC, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp} from 'react-icons/io5'

export const Navbar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="text-black bg-white dark:bg-[#121212] dark:text-white p-4 fixed top-0 w-screen z-20">
      <div className="max-w-screen-lg px-5 mx-auto">
        <div className="flex justify-between items-center animate__animated animate__fadeIn">
          <div>
            <Link href="/" className="flex items-baseline font-bold">
              <h1 className="font-bold text-primary text-4xl flex items-baseline">
                Too
              </h1>
              <h1 className="font-bold text-success text-4xl flex items-baseline">
                Doo
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-7">
            <ThemeSwitcher />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="text-3xl transition ease-out hover:scale-110"
                >
                  <FaUserCircle />
                </button>
                <div
                  className={`absolute translate-y-2 -translate-x-36 w-44 rounded-lg bg-white dark:bg-black border border-neutral flex-col gap-2 p-4 animate__animated animate__fadeIn animate__faster ${
                    isModalOpen ? "flex" : "hidden"
                  }`}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-lg w-fit absolute right-2 top-2"
                  >
                    <IoCloseSharp />
                  </button>
                  <Link
                    href="/perfil"
                    className="hover:text-primary transition ease-out w-fit"
                  >
                    Perfil
                  </Link>
                  <span
                    onClick={() => logoutUser()}
                    className="flex items-center gap-2 cursor-pointer hover:text-error transition ease-out w-fit"
                  >
                    Cerrar Sesión
                  </span>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="bg-primary text-white px-5 font-semibold transform hover:scale-105 py-2 rounded-full animate__animated animate__fadeIn transition ease-out"
                >
                  Ingresar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
