import useSWR from "swr";
import { AppLayout } from "@/components/layouts/AppLayout";
import { fetcher } from "@/utils";
import { ITodo } from "@/interfaces";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui";
import { AddTodoModal } from "@/components/todos/AddTodoModal";
import { AuthContext } from "@/context";
import { useRouter } from "next/router";
import Image from "next/image";
import { TodoContainer } from "@/components/todos";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) {
      replace("auth");
    }
  }, [user]);

  const { data, error, isLoading } = useSWR(`/todo`, fetcher, {
    refreshInterval: 1000,
  });
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return <></>;

  if (error) return <h1 className="top-1/2 right-1/2 absolute">Error</h1>;

  if (isLoading) return <LoadingSpinner />;

  const completedTodos = data.filter((todo: ITodo) => todo.complete === true);
  const pendingTodos = data.filter((todo: ITodo) => todo.complete === false);

  return (
    <AppLayout
      title="TooDoo - Home"
      pageDescription="Administra tus tareas con clase!"
    >
      <div className="flex flex-col gap-5 mx-auto max-w-screen-lg p-5">
        {data.length > 0 && (
          <>
            <button
              onClick={() => setIsOpen(true)}
              className="w-fit hidden md:flex bg-primary text-white px-5 font-semibold transform hover:scale-105 py-2 rounded-full animate__animated animate__fadeIn transition ease-out"
            >
              Agregar Todo
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full md:hidden block fixed bottom-0 right-0 transition ease-in text-white bg-primary text-2xl p-5 hover:bg-primary-light hover:border-dark-yellow border-yellow m-10 mr-5 z-50"
            >
              <AiOutlinePlus />
            </button>
          </>
        )}

        {data.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-2 w-full">
            <h2 className="text-3xl">Esto esta medio vacío...</h2>
            <p>¿Por qué no agregas un TooDoo?</p>
            <button
              onClick={() => setIsOpen(true)}
              className="w-fit mt-5 bg-primary text-white text-xl px-6 font-semibold transform hover:scale-105 py-2 rounded-full animate__animated animate__fadeIn transition ease-out"
            >
              Agregar Todo
            </button>
            <Image
              src={"/empty0.png"}
              className="opacity-50 mx-auto p-10"
              alt="Animated shiba inu crying"
              width={500}
              height={500}
            />
          </div>
        ) : (
          <TodoContainer
            completedTodos={completedTodos}
            pendingTodos={pendingTodos}
          />
        )}
      </div>

      <AddTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppLayout>
  );
}
