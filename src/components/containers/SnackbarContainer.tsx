import React, {FC, ReactNode} from 'react';
import IconButton from "../ui/buttons/IconButton";
import CloseCrossIcon from "../ui/icons/CloseCrossIcon";
import {useSnackbar} from "../../hooks/useSnackbar";

interface SnackbarContainerProps {
    children: ReactNode
}

const SnackbarContainer: FC<SnackbarContainerProps> = ({children}) => {
    const {close} = useSnackbar();

    return (
        <div className="snackbar-container">
            <div className="position-relative">
                <IconButton className="position-absolute top-0 end-0" onClick={close}>
                    <CloseCrossIcon/>
                </IconButton>
                {children}
            </div>
        </div>
    );
};

export default SnackbarContainer;