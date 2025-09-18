import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '@pages/Auth/LoginPage';
import { RegistrationPage } from '@pages/Auth/RegistrationPage';
import '../index.css';

const App = () => {
    return (
        <main className='w-full h-screen flex flex-col p-4'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PrivateRoute />}></Route>
                    <Route path='/auth'>
                        <Route path='/auth/sign-in' element={<LoginPage />} />
                        <Route path='/auth/sign-up' element={<RegistrationPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
