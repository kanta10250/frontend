'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// Type definition of context
interface ActionContextType {
  buttonState: boolean;
  toggleButtonState: () => void;
  disabledButtonState: () => void;
}

// Default value of context
const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const toggleButtonState = () => {
    setButtonState((prevState) => !prevState);
  };

  const disabledButtonState = () => {
    setButtonState(false);
  };

  return (
    <ActionContext.Provider
      value={{ buttonState, toggleButtonState, disabledButtonState }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = (): ActionContextType => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error('useActionContext must be used within an ActionProvider');
  }
  return context;
};
