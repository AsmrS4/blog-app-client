import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuth = !!localStorage.getItem('ACCESS_TOKEN');
    return isAuth ? <Outlet /> : <Navigate to={'/auth/sign-in'} />;
};
