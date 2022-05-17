import {ReactNode, useContext} from "react";
import {SnackbarContext} from "../components/providers/SnackbarProvider";
import {SnackbarOptions} from "../types";
import {capitalizeFirstLetter} from "../helpers";

export function useSnackbar() {
    const snackbarContext = useContext(SnackbarContext);

    const snackbar = (children: string | ReactNode, options: SnackbarOptions = {}) => {
        snackbarContext?.setSnackbarChildren(children);
        snackbarContext?.setOpen(true);

        Object.entries(options).forEach(([k, v]) => {
            const prefix = 'setSnackbar';
            const property = capitalizeFirstLetter(k)

            if (snackbarContext) {
                (snackbarContext as any)[prefix + property](v);
            }
        })
    }

    const close = () => {
        snackbarContext?.setOpen(false);
    }

    return {snackbar, close}
}