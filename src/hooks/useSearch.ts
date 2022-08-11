import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface FormValues {
    search: string;
}

export function useSearch(cb: (data: FormValues) => void) {
    const { control, handleSubmit, watch } = useForm<FormValues>();

    useEffect(() => {
        const subscription = watch(() => handleSubmit(cb)());
        return () => subscription.unsubscribe();
    }, [watch]);


    return control;
}
