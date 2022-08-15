import { useTypedSelector } from './useTypedSelector';

export function useIsCurrentUser(hash: string) {
    const { user } = useTypedSelector(state => state.auth);
    return user?.hash === hash;
}
