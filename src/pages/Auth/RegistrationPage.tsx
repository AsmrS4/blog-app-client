import { Controller, useForm } from 'react-hook-form';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { registerSchema, type RegisterSchema } from './config';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContainerCentered } from '@components/Container/Container';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterProps } from '@models/User';
import { useDispatch } from 'react-redux';
import { registerUser } from '@store/Auth/authActions';
import { ErrorToast, SuccessToast } from '@components/Toasts';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const RegistrationPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const onSubmit = async (form: RegisterProps) => {
        setIsLoading(true);
        try {
            await dispatch(registerUser(form));
            SuccessToast('Добро пожаловать');
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
    return (
        <ContainerCentered>
            <div className='flex flex-col items-start max-w-[384px] w-full h-[520px] gap-6 px-3 box-border'>
                <div className='flex flex-col justify-between items-start w-full py-4 box-border'>
                    <h2 className='text-3xl font-semibold'>Регистрация</h2>
                    <span>Введите данные регистрации аккаунта</span>
                </div>
                <Form
                    className='w-full box-border flex flex-col rounded-md p-4 items-center justify-between gap-1'
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
                    <Form.Item
                        className='w-full'
                        help={errors.confirmPassword?.message}
                        validateStatus={errors.confirmPassword ? 'error' : ''}
                    >
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    value={field.value}
                                    onChange={field.onChange}
                                    size='large'
                                    className='w-full'
                                    placeholder=' Повторите пароль'
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            )}
                        />
                    </Form.Item>
                    <Link className='w-full text-center underline' to={'/auth/sign-in'}>
                        Войти в существующий аккаунт
                    </Link>
                    <Button
                        loading={isLoading}
                        iconPosition='end'
                        size='large'
                        type='primary'
                        className='mt-4 w-full'
                        htmlType='submit'
                    >
                        Зарегистрироваться
                    </Button>
                </Form>
            </div>
        </ContainerCentered>
    );
};
