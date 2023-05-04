import React, { FC, useMemo, useState } from "react";
import { TbPencil } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { todoApi } from "@/api/todoApi";
import { IUser } from "@/interfaces";
import Cookies from "js-cookie";
import { EditTodoModal } from "./EditTodoModal";
import { AddTodoModal } from "./AddTodoModal";

interface Props {
  id: string;
  title: string;
  description?: string;
  complete: boolean;
  user: IUser;
}

export const TodoCard: FC<Props> = ({
  id,
  title,
  description,
  complete,
  user,
}) => {
  const [isComplete, setIsComplete] = useState(complete);
  const [isOpen, setIsOpen] = useState(false);

  const token = useMemo(() => Cookies.get("token"), []);

  const handleToggle = () => {
    setIsComplete(!isComplete);
    todoApi.patch(
      "/todo/" + id,
      { complete: !isComplete },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Desea eliminar el Todo?",
      icon: "warning",
      showCancelButton: true,
      iconColor: "#F5A524",
      confirmButtonColor: "#0072F5",
      cancelButtonColor: "#F31260",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        todoApi.delete("/todo/" + id);
      }
    });
  };

  return (
    <>
      <div className="rounded shadow bg-accent-light dark:bg-black p-5 flex flex-col gap-5 animate__animated animate__fadeIn">
        <div className="flex items-start justify-between">
          <span className="flex gap-3 items-baseline">
            <h1 className="font-bold text-lg capitalize">{title}</h1>
            <small className="text-neutral">{user.fullName}</small>
          </span>
          <button
            onClick={handleDelete}
            className="text-xl mt-1 hover:text-error ease-out transition"
          >
            <HiOutlineTrash />
          </button>
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="bg-white whitespace-pre-line dark:bg-accent-dark hover:-translate-y-1 transition ease-out cursor-pointer py-1 px-2 rounded"
        >
          {description}
        </div>
        <button
          onClick={handleToggle}
          className={`${
            !isComplete ? "bg-primary" : "bg-success"
          } font-bold text-white py-2 rounded hover:-translate-y-1 text-sm transition ease-out`}
        >
          {!isComplete ? "Pendiente" : "Completado"}
        </button>
      </div>
      <EditTodoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        todoDescription={description}
        id={id}
      />
    </>
  );
};
