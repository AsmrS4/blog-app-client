import { AntCloudOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ErrorToast } from '@components/Toasts';
import { useAppSelector } from '@hooks/useAppSelector';
import { logoutUser } from '@store/Auth/authActions';
import { clearSession } from '@store/Auth/authReducer';
import { FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const { user, isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            await navigate('/auth/sign-in');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401 || error.status === 403) {
                    await dispatch(clearSession());
                    await navigate('/auth/sign-in');
                }
                return ErrorToast(error.response?.data.message);
            }
            return ErrorToast('Что-то пошло не так');
        }
    };
    return (
        <header className='w-full box-border p-4 h-[80px] shadow-xs'>
            <nav className='w-full box-border h-full flex flex-row items-center justify-between'>
                <Link to={'/'}>
                    <div className='flex flex-row items-center justify-between h-[40px]'>
                        <h2 className='font-bold text-blue-500 text-xl'>HIT's Блог</h2>
                    </div>
                </Link>

                <div className='flex flex-row items-center justify-betweenv gap-3 box-border'>
                    {isAuth && (
                        <>
                            <span className='text-sm font-light m-0 flex flex-row gap-2'>
                                <UserOutlined
                                    shape='circle'
                                    style={{
                                        color: '#b5b5b5',
                                        height: '20px',
                                        width: '20px',
                                        borderRadius: '10px',
                                        border: '0.5px solid #b5b5b5',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                />
                                <span className='m-0 font-semibold tracking-wide'>
                                    {user?.username}
                                </span>
                            </span>
                            <Tooltip placement='left' color='blue' title='Выйти'>
                                <Button
                                    variant='solid'
                                    color='primary'
                                    icon={<LogoutOutlined />}
                                    iconPosition='end'
                                    onClick={handleLogout}
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
