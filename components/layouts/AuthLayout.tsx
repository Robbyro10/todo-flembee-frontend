import { AuthContext } from '@/context';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useContext, useEffect } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  pageDescription: string;
}

export const AuthLayout: FC<Props> = ({ children, title, pageDescription }) => {
  const { user } = useContext(AuthContext);
  const { replace } = useRouter();
  useEffect(() => {
    if (user) replace('/');
  }, [user]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>
      <main>
        <div className="h-screen w-full bg-white dark:bg-black text-black dark:text-white bg-primary-light overflow-hidden">
          {children}
        </div>
      </main>
      <footer>{/* todo footer */}</footer>
    </>
  );
};
