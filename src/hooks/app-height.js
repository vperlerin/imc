import { useEffect } from 'react';

const AppHeight = () => {
  useEffect(() => {
    const onResize = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
};

export default AppHeight;
