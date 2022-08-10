import { useTypedSelector } from './useTypedSelector';

export function useIsLogged() {
    const { isLogged } = useTypedSelector(state => state.auth);

}
