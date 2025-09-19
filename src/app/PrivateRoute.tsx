import { useAppSelector } from '@hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuth: boolean = localStorage.getItem('ACCESS_TOKEN') ? true : false;
    return isAuth ? <Outlet /> : <Navigate to={'/auth/sign-in'} />;
};
