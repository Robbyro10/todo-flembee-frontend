import { todoApi } from "@/api/todoApi";
import { AuthContext } from "@/context";
import { ITodo } from "@/interfaces";
import Cookies from "js-cookie";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";

interface Props {
    isOpen: boolean;
    id: string;
    onClose: () => void;
    todoDescription?: string;
}

export const EditTodoModal: FC<Props> = ({ onClose, isOpen, id, todoDescription }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

      useEffect(() => {
        setValue('description', todoDescription);
      }, [todoDescription])

      const token = useMemo(
        () => Cookies.get("token"),
        []
      );
      
      const onSubmit = async (data: any) => {
        todoApi.patch('/todo/' + id , { description: data.description }, { headers: {"Authorization" : `Bearer ${token}` }});
        onClose();
      }

      if (!isOpen) return null;
  return (
    <div className="fixed z-20 inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm animate__animated animate__fadeIn animate__faster">
      <div tabIndex={0} className="bg-accent-light dark:bg-accent-dark shadow p-6 rounded-lg w-[500px] relative mx-2">
        <button
          onClick={onClose}
          className="text-primary text-2xl text-right rounded-full p-1 absolute top-0 right-0 my-5 mx-6 hover:bg-primary hover:bg-opacity-20 transition ease-out"
        >
          <IoCloseSharp />
        </button>
        <h1 className="text-2xl md:text-3xl mb-5 text-primary font-bold">Editar Descripción</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-h-[calc(100vh-150px)] overflow-y-auto px-5">
          <div className="flex flex-col gap-2">
            <label>Descripción</label>
            <textarea
              rows={4}
              className="rounded-lg resize-none bg-accent-light dark:bg-accent-dark hover:border-primary transition ease-out"
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <span className="text-error">Campo obligatorio</span>
            )}
          </div>
        
          <button
            type="submit"
            className="bg-primary hover:bg-primary-light transition ease-out rounded-full px-5 py-2 text-white font-bold"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  )
}
