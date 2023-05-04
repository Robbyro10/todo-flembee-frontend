import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context';
import Swal from 'sweetalert2';

interface Props {
  active: boolean;
  onTypeChange: (type: 'login' | 'signup') => void;
}

export const LoginModal: FC<Props> = ({ active, onTypeChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const { loginUser } = useContext(AuthContext);
  const { replace } = useRouter();
  const onSubmit = async (data: { email: string; password: string }) => {
    const isValidLogin = await loginUser(data.email, data.password);
    if (!isValidLogin) {
      Swal.fire('Error', 'Datos incorrectos', 'error')
      return;
    };
    
    replace('/')
  };
  return (
    <div
      className={`bg-accent-light dark:bg-accent-dark p-5 rounded-lg flex flex-col gap-10 justify-center items-center shadow-md h-full w-full md:w-1/2 fixed top-0 left-0 transform transition-all duration-700 ${
        active
          ? 'z-10'
          : '-translate-x-full md:translate-x-1/2 z-0 transition-all duration-500 opacity-0'
      }`}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-baseline font-bold justify-center">
          <h1 className="text-success text-2xl md:text-3xl">Too</h1>
          <h1 className="text-primary text-xl md:text-3xl">Doo</h1>
        </div>
        <div className="flex flex-col items-center mt-5 mb-10 gap-2">
          <h1 className="font-bold text-3xl md:text-4xl text-center text-primary">
            Iniciar Sesión
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <div className="relative">
              <input
                className="px-3 py-2 w-full rounded-lg bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
                type="text"
                placeholder="Correo"
                {...register('email', {
                  required: true,
                })}
              />
            </div>
            {errors.email?.type === 'required' && (
              <p className="text-error mb-3">Campo obligatorio</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-lg">Contraseña</label>
            <input
              className="rounded-lg px-3 py-2 bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
              type="password"
              placeholder="Contraseña"
              {...register('password', {
                required: true,
              })}
            />
            {errors.password?.type === 'required' && (
              <p className="text-error">Campo obligatorio</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary shadow-md hover:bg-primary-light font-bold text-lg transition rounded-full ease-out text-white w-full mt-10 py-2"
          >
            Acceder
          </button>
        </form>
        <div className="flex flex-col gap-3 text-center mt-5">
          <p
            className="hover:underline cursor-pointer"
            onClick={() => onTypeChange('signup')}
          >
            No tengo cuenta
          </p>
        </div>
      </div>
    </div>
  );
};
