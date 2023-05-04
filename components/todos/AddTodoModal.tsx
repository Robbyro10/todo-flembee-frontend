import { todoApi } from "@/api/todoApi";
import { AuthContext } from "@/context";
import { FC, useContext } from "react";
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTodoModal: FC<Props> = ({ onClose, isOpen }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const { user } = useContext(AuthContext)

      const onSubmit = async (data: any) => {
        todoApi.post('/todo', data, { headers: {"Authorization" : `Bearer ${user!.token}` }});
        onClose();
        reset();
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
        <h1 className="text-2xl md:text-3xl mb-5 text-primary font-bold">Agregar Todo</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-h-[calc(100vh-150px)] overflow-y-auto px-5">
        <div className="flex flex-col gap-2">
            <label>Título</label>
            <div className="relative">
              <input
                className="px-3 py-2 w-full rounded-lg bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
                type="text"
                {...register('title', {
                  required: true,
                })}
              />
            </div>
            {errors.title?.type === 'required' && (
              <p className="text-error mb-3">Campo obligatorio</p>
            )}
          </div>
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
            Agregar Todo
          </button>
        </form>
      </div>
    </div>
  )
}
