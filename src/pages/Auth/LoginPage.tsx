import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, Space } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { authSchema, type AuthSchema } from './config';
import { ContainerCentered } from '@components/Container/Container';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'antd/es/typography/Link';

interface AuthProps {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<AuthSchema>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const onSubmit = (form: AuthProps) => {
        console.log(form);
    };
    return (
        <ContainerCentered>
            <div className='flex flex-col max-w-[420px] w-full gap-6'>
                <div className='flex flex-col  justify-between items-start w-full py-4'>
                    <h2 className='text-3xl font-semibold'>Авторизация</h2>
                    <span>Введите данные для входа в приложение</span>
                </div>
                <Form
                    className='w-full box-border flex flex-col rounded-md p-4 items-start justify-between '
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
                    <Link className='w-full text-center underline'>Создать аккаунт</Link>
                    <Button className='mt-4 ' htmlType='submit'>
                        Войти
                    </Button>
                </Form>
            </div>
        </ContainerCentered>
    );
};
