import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useToggleState = (initialState = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [isVisible, setVisible] = useState(initialState);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return [isVisible, toggleVisible, setVisible];
};
