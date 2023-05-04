import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context';
import { ISignUp } from '@/interfaces';
import Swal from 'sweetalert2';

interface Props {
  active: boolean;
  onTypeChange: (type: 'login' | 'signup') => void;
}

export const RegisterModal: FC<Props> = ({ active, onTypeChange }) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp & { password2: string }>();
  const { registerUser } = useContext(AuthContext);

  const onSubmit = async (data: ISignUp & { password2: string }) => {
    const { fullName, email, password } = data;
    if (data.password !== data.password2)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden',
    })
    if (
      await registerUser( fullName, email, password )
    )
      replace('/');
  };

  return (
    <div
      className={`bg-accent-light dark:bg-accent-dark rounded-lg flex flex-col gap-10 justify-center items-center shadow-md h-full w-full md:w-1/2 fixed top-0 right-0 transform transition-all duration-700 ${
        active
          ? 'z-10'
          : 'translate-x-full md:-translate-x-1/2 z-0 transition-all duration-500 opacity-0'
      }`}
    >
      <div className="w-full max-w-2xl mx-auto overflow-y-auto p-5">
        <div className="flex items-baseline font-bold justify-center">
        <h1 className="text-success text-2xl md:text-3xl">Too</h1>
          <h1 className="text-primary text-xl md:text-3xl">Doo</h1>
        </div>
        <div className="flex flex-col items-center my-5 gap-2">
          <h1 className="font-bold text-3xl text-center text-primary">
            Crear Cuenta
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 max-w-md mx-auto"
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg">Nombre</label>
            <input
              className="border border-neutral rounded-lg px-3 py-2 bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
              type="text"
              placeholder="Nombre"
              {...register('fullName', {
                required: true,
              })}
            />
            {errors.fullName?.type === 'required' && (
              <p className="text-error">Campo obligatorio</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <div className="relative">
              <input
                className="px-3 py-2 w-full border border-neutral rounded-lg bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
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

          <div className="flex flex-col gap-1">
            <label className="text-lg">Contraseña</label>
            <input
              className="border border-neutral rounded-lg px-3 py-2 bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
              type="password"
              placeholder="Contraseña"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === 'required' && (
              <p className="text-error">Campo obligatorio</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-error">Mínimo 6 caracteres</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg">Repita su Contraseña</label>
            <input
              className="border border-neutral rounded-lg px-3 py-2 bg-accent-light dark:bg-accent-dark transition ease-out hover:border-primary"
              type="password"
              placeholder="Repita su Contraseña"
              {...register('password2', {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password2?.type === 'required' && (
              <p className="text-error">Campo obligatorio</p>
            )}
            {errors.password2?.type === 'minLength' && (
              <p className="text-error">Mínimo 6 caracteres</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary shadow-md disabled:bg-primary-dark font-bold text-lg hover:bg-primary-light transition rounded-full ease-out text-white w-full mt-5 py-2"
          >
            Crear cuenta
          </button>
        </form>
        <div className="flex flex-col gap-3 text-center mt-5">
          <p
            className="hover:underline cursor-pointer"
            onClick={() => onTypeChange('login')}
          >
            Ya tengo cuenta
          </p>
        </div>
      </div>
    </div>
  );
};
