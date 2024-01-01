import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader'

const ScrollToTop = () => {
    const location = useLocation();
    const mainRef = useRef<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const locationSelector = useSelector((state: any) => state.location);

    useEffect(() => {
        window.scrollTo(0, 1000);
        document.body.scrollTop = 0; // For Safari
        document.body.scrollTo(0, 0); // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        mainRef.current.scrollTo(0, 0);

        const locationCached = locationSelector.locations.find((lc: any) => {
            return lc.pathName === location.pathname
        })

        if (locationCached?.isLoaded) {
            setLoading(false)
        } else {
            setLoading(true)
        }

        setTimeout(() => {
            setLoading(false)
        }, 500);

        let title = '';
        switch (location.pathname) {
            case '/':
                title = 'BMI Application';
                break;
            case '/info':
                title = 'Info BMI';
                break;
            case '/result':
                title = 'Result BMI';
                break;
            default:
                title = 'BMI Application';
                break;
        }
        document.title = title
    }, [location]);

    return (
        <div
            ref={mainRef}>
            {loading ? <div className='w-full h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center'>
                <BounceLoader color="#FFEB3B" />
            </div>
                : <Outlet />}
        </div>
    )
};

export default ScrollToTop;