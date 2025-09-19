import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { authSchema, type AuthSchema } from './config';
import { ContainerCentered } from '@components/Container/Container';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthProps } from '@models/User';
import { loginUser } from '@store/Auth/authActions';
import { ErrorToast, InfoToast } from '@components/Toasts';
import { AxiosError } from 'axios';
import { clearSession } from '@store/Auth/authReducer';
import { useEffect, useState } from 'react';

export const LoginPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AuthSchema>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const onSubmit = async (form: AuthProps) => {
        setIsLoading(true);
        try {
            await dispatch(loginUser(form));
            InfoToast('Добро пожаловать');
            navigate('/');
        } catch (error) {
            if (error instanceof AxiosError) {
                return ErrorToast(error.response?.data.message);
            }
            return ErrorToast('Что-то пошло не так');
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        dispatch(clearSession());
    }, []);
    return (
        <ContainerCentered>
            <div className='flex flex-col items-start max-w-[384px] w-full h-[520px] gap-6 px-3 box-border'>
                <div className='flex flex-col justify-between items-start w-full py-4 box-border'>
                    <h2 className='text-3xl font-semibold'>Авторизация</h2>
                    <span>Введите данные для входа в приложение</span>
                </div>
                <Form
                    className='w-full box-border flex flex-col rounded-md p-4 items-center justify-between '
                    onFinish={handleSubmit(onSubmit)}
                >
                    <Form.Item
                        className='w-full'
                        help={errors.username?.message}
                        validateStatus={errors.username ? 'error' : ''}
                    >
                        <Controller
                            name='username'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    size='large'
                                    className='w-full'
                                    placeholder=' Введите username'
                                    prefix={<UserOutlined />}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        className='w-full'
                        help={errors.password?.message}
                        validateStatus={errors.password ? 'error' : ''}
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    value={field.value}
                                    onChange={field.onChange}
                                    size='large'
                                    className='w-full'
                                    placeholder=' Введите пароль'
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            )}
                        />
                    </Form.Item>
                    <Link className='w-full text-center underline' to={'/auth/sign-up'}>
                        Создать аккаунт
                    </Link>
                    <Button
                        loading={isLoading}
                        iconPosition='end'
                        size='large'
                        type='primary'
                        className='mt-4 w-full'
                        htmlType='submit'
                    >
                        Войти в систему
                    </Button>
                </Form>
            </div>
        </ContainerCentered>
    );
};
