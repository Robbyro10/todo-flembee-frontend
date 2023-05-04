import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ImSun } from 'react-icons/im';
import { FaRegMoon } from 'react-icons/fa';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="transition text-xl ease-out hover:scale-110 animate__animated animate__fadeIn"
    >
      {theme === 'light' ? <ImSun /> : <FaRegMoon className='text-lg' />}
    </button>
  );
};
