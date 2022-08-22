import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { refresh } from './store/slices/auth';
import { useAppDispatch } from './store';
import { useTypedSelector } from './hooks';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();

const LinkBehavior = React.forwardRef<HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>((props, ref) => {
    const { href, ...other } = props;
    return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: 'grey'
                    }
                }
            }
        }
    },
});

function App() {
    const dispatch = useAppDispatch();

    const { isLoaded } = useTypedSelector(state => state.auth);

    useEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                {isLoaded && <AppRoutes />}
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
