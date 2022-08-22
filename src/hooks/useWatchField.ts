import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useWatchField<T>(cb: SubmitHandler<T>) {
    const { watch, handleSubmit, control } = useForm<T>();

    useEffect(() => {
        const subscription = watch(() => handleSubmit(cb)());
        return () => subscription.unsubscribe();
    }, [watch]);

    return control;
}
