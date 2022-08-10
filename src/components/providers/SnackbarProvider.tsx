import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { SnackbarContainer } from '../containers';

export const SnackbarContext = createContext<null | SnackbarContextDto>(null);

interface SnackbarProviderProps {
    children: ReactNode;
}

interface SnackbarContextDto {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSnackbarChildren: Dispatch<SetStateAction<string | ReactNode>>;
    setSnackbarTimeout: Dispatch<SetStateAction<number>>;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackbarChildren, setSnackbarChildren] = useState<string | ReactNode>('');
    const [snackbarTimeout, setSnackbarTimeout] = useState(5000);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, snackbarTimeout);
        }
    }, [open]);

    return (
        <SnackbarContext.Provider value={{ setOpen, setSnackbarChildren, setSnackbarTimeout }}>
            {
                open &&
                <SnackbarContainer>
                    {snackbarChildren}
                </SnackbarContainer>
            }
            {children}
        </SnackbarContext.Provider>
    );
};
