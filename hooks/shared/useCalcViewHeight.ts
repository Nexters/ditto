import { useEffect } from 'react';

export const useCalcViewHeight = () => {
  useEffect(() => {
    const setViewHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setViewHeight);
    setViewHeight();

    return () => {
      window.removeEventListener('resize', setViewHeight);
    };
  }, []);
};
