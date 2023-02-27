import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useSwitchState = (initialState = false): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [isVisible, setVisible] = useState(initialState);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return [isVisible, setVisible, toggleVisible];
};
