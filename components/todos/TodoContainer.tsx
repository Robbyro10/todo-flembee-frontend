import { ITodo } from "@/interfaces";
import { FC } from "react";
import { TodoCard } from "./TodoCard";

interface Props {
  pendingTodos: ITodo[];
  completedTodos: ITodo[];
}

export const TodoContainer: FC<Props> = ({ pendingTodos, completedTodos }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-3 w-full">
          <h2 className="font-bold text-3xl text-primary">Pendientes</h2>
          {pendingTodos.length === 0 ? (
            <h3 className="font-semibold text-neutral">
              No hay TooDoos pendientes!
            </h3>
          ) : (
            pendingTodos.map((todo: ITodo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                complete={todo.complete}
                user={todo.user}
              />
            ))
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="font-bold text-3xl text-success">Completados</h2>
          {completedTodos.length === 0 ? (
            <h3 className="font-semibold text-neutral">
              No has completado ningun TooDoo!
            </h3>
          ) : (
            completedTodos.map((todo: ITodo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                complete={todo.complete}
                user={todo.user}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
