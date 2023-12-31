import { Outlet, useLocation } from 'react-router';

const Hoc = () => {
    const location = useLocation();
    console.log('hoc is active', location);

    return <Outlet />;
}

export default Hoc