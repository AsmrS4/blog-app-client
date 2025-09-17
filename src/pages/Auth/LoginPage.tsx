import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Space } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import type { authSchema, AuthSchema } from './config';

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AuthSchema>();
    const onSubmit: SubmitHandler<AuthSchema> = (data) => {};
    return (
        <form
            className='w-max-[468px] box-border flex flex-col border-8 p-4 items-start justify-between gap-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input size='large' placeholder='large size' prefix={<UserOutlined />} />
            <Input.Password
                size='large'
                placeholder='input password'
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </form>
    );
};
