import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

const ScrollToTop = () => {

    const location = useLocation();
    const mainRef = useRef<any>()
    const [prev, setPrev] = useState<string>();

    useEffect(() => {
        let flag = true;
        if (prev === '/test/test2' || location.pathname === '/test/test2') {
            flag = false
        }

        setPrev(location.pathname)

        if (flag) {
            window.scrollTo(0, 1000);
            document.body.scrollTop = 0; // For Safari
            document.body.scrollTo(0, 0); // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            mainRef.current.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div
            ref={mainRef}>
            <Outlet />
        </div>
    )
};

export default ScrollToTop;