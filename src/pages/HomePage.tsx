import { ContainerCustom } from '@components/Container/Container';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Form, Skeleton } from 'antd';
import { useAppSelector } from '@hooks/useAppSelector';
import type { PostProps } from '@models/Post';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '@store/Posts/postsAction';
import { PostCard } from '@components/Post/PostCard';
import { useEffect, useState } from 'react';
import ImageUploader from '@components/Image/ImageUploader';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostSchema } from './post.config';
import axios, { AxiosError } from 'axios';
import { ErrorToast } from '@components/Toasts';
import { clearSession } from '@store/Auth/authReducer';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
    const [loadedPosts, setPosts] = useState<Array<PostProps>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
    } = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            text: '',
        },
    });
    const handleSubmitPost = async () => {
        try {
            const response = await axios({
                url: `${'http://localhost:8800/api/v1'}/posts`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
                data: {
                    title: getValues('title'),
                    text: getValues('text'),
                    image: imageUrl,
                },
            });
            const newPost: PostProps = await response.data;
            setPosts((prev) => [newPost, ...prev]);
            handleClose();
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status == 401 || error.status == 403) {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                } else if (error.status == 400) {
                    return ErrorToast('Некорректные данные');
                } else {
                    return ErrorToast('Ошибка сервера');
                }
            }
        }
    };
    const handleClose = () => {
        reset();
        setImageUrl(null);
        setIsOpen(false);
    };
    useEffect(() => {
        if (isLoading) {
            setPosts([...Array(3)]);
            dispatch(fetchPosts());
        } else {
            setPosts(posts);
        }
    }, [posts, isLoading]);

    return (
        <ContainerCustom size={'md'}>
            <Button
                className='w-full'
                size='large'
                icon={<PlusOutlined />}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Создать пост
            </Button>
            <ul className='w-full flex flex-col items-start justify-between gap-3'>
                {loadedPosts.map((item: PostProps, index: number) => {
                    return (
                        <>
                            <Skeleton key={index} loading={isLoading} active>
                                <PostCard key={item?.id} {...item} />
                            </Skeleton>
                        </>
                    );
                })}
            </ul>
            <Modal
                title='Создать пост'
                open={isOpen}
                onOk={handleSubmit(handleSubmitPost)}
                okText='Создать'
                cancelText='Отменить'
                cancelButtonProps={{ danger: true }}
                onCancel={handleClose}
            >
                <Form className='flex flex-col justify-between my-6'>
                    <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    <Form.Item
                        help={errors.title?.message}
                        validateStatus={errors.title ? 'error' : ''}
                    >
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    allowClear
                                    value={field.value}
                                    onChange={field.onChange}
                                    size='large'
                                    className='w-full mt-6'
                                    placeholder='Название...'
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        help={errors.text?.message}
                        validateStatus={errors.text ? 'error' : ''}
                    >
                        <Controller
                            name='text'
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea
                                    allowClear
                                    value={field.value}
                                    onChange={field.onChange}
                                    size='large'
                                    className='w-full'
                                    placeholder='Описание...'
                                />
                            )}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </ContainerCustom>
    );
};
