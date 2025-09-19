import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '@pages/Auth/LoginPage';
import { RegistrationPage } from '@pages/Auth/RegistrationPage';
import { ToastContainer } from 'react-toastify';
import { Header } from '@components/Header';
import { HomePage } from '@pages/HomePage';
import '../index.css';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main className='w-full h-screen flex flex-col p-4'>
                    <Routes>
                        <Route path='/' element={<PrivateRoute />}>
                            <Route path='/' element={<HomePage />} />
                        </Route>
                        <Route path='/auth'>
                            <Route path='/auth/sign-in' element={<LoginPage />} />
                            <Route path='/auth/sign-up' element={<RegistrationPage />} />
                        </Route>
                    </Routes>
                </main>
            </BrowserRouter>
            <ToastContainer limit={3} />
        </>
    );
};

export default App;
