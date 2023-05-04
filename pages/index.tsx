import useSWR from "swr";
import { AppLayout } from "@/components/layouts/AppLayout";
import { fetcher } from "@/utils";
import { TodoCard } from "@/components/todos";
import { ITodo } from "@/interfaces";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui";
import { AddTodoModal } from "@/components/todos/AddTodoModal";
import { AuthContext } from "@/context";
import { Router, useRouter } from "next/router";

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
  const [isEdit, setIsEdit] = useState(false);

  if (error) return <h1 className="top-1/2 right-1/2 absolute">Error</h1>;

  if (isLoading) return <LoadingSpinner />;

  if (data.length === 0)
    return <h1 className="inset-0 absolute">No hay todos</h1>;

  const completedTodos = data.filter((todo: ITodo) => todo.complete === true);
  const pendingTodos = data.filter((todo: ITodo) => todo.complete === false);

  return (
    <AppLayout
      title="TooDoo - Home"
      pageDescription="Administra tus tareas con clase!"
    >
      <div className="flex flex-col gap-5 mx-auto max-w-screen-lg p-5">
        <button
          onClick={() => { setIsEdit(false); setIsOpen(true) }}
          className="w-fit hidden md:flex bg-primary text-white px-5 font-semibold transform hover:scale-105 py-2 rounded-full animate__animated animate__fadeIn transition ease-out"
        >
          Agregar Todo
        </button>
        <button
          onClick={() => { setIsEdit(false); setIsOpen(true) }}
          className="rounded-full md:hidden block fixed bottom-0 right-0 transition ease-in text-white bg-primary text-2xl p-5 hover:bg-primary-light hover:border-dark-yellow border-yellow m-10 mr-5 z-50"
        >
          <AiOutlinePlus />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-3 w-full">
            <h1 className="font-bold text-2xl">Pendientes</h1>
            {pendingTodos.map((todo: ITodo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                complete={todo.complete}
                user={todo.user}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <h1 className="font-bold text-2xl">Completadas</h1>
            {completedTodos.map((todo: ITodo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                complete={todo.complete}
                user={todo.user}
              />
            ))}
          </div>
        </div>
      </div>

      <AddTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppLayout>
  );
}
