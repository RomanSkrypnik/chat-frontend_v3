import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import cn from "classnames";

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({children}) => {
    const [flag, setFlag] = useState(false);
    const [anim, setAnim] = useState<null | string>(null);
    const [firstRender, setFirstRender] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setFirstRender(true);
    }, []);

    useEffect(() => {
        if (firstRender) {
            setFlag(true);
        }
    }, [firstRender]);

    useEffect(() => {
        if (firstRender) {
            setAnim(flag ? 'slide-in' : 'slide-out');
        }
    }, [flag]);

    useEffect(() => {
        if (firstRender) {
            setFlag(false);

            setTimeout(() => {
                setFlag(true);
            }, 500);
        }
    }, [location]);

    return (
        <>
            {
                anim &&
                <div className={cn('flex-grow-1', anim)}>
                    {children}
                </div>
            }
        </>
    );
};

export default Wrapper;