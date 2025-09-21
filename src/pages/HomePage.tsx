import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Form, Skeleton } from 'antd';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ContainerCustom } from '@components/Container/Container';
import ImageUploader from '@components/Image/ImageUploader';
import { PostCard } from '@components/Post/PostCard';
import { ErrorToast, InfoToast } from '@components/Toasts';
import { useAppSelector } from '@hooks/useAppSelector';
import type { EditPostProps, PostProps } from '@models/Post';
import { clearSession } from '@store/Auth/authReducer';
import { editPost, fetchPosts } from '@store/Posts/postsAction';
import { postSchema, type PostSchema } from './post.config';

export const HomePage = () => {
    const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loadedPosts, setPosts] = useState<Array<PostProps>>([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [postId, setPostId] = useState<string | null>(null);

    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        setValue,
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
    const handleEditPost = async (editedPost: EditPostProps) => {
        try {
            dispatch(
                editPost(postId, {
                    title: editedPost.title,
                    text: editedPost.text,
                    image: imageUrl,
                }),
            );
            InfoToast('Данные успешно обновлены');
            handleClose();
        } catch (error) {
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
    const handleEditModal = (post: PostProps) => {
        setPostId(post.id);
        setValue('title', post.title);
        setValue('text', post.text);
        setImageUrl(post.image || null);
        setEditModalOpen(true);
    };
    const handleClose = () => {
        reset();
        setImageUrl(null);
        setPostId(null);
        setCreateModalOpen(false);
        setEditModalOpen(false);
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
                    setCreateModalOpen(true);
                }}
            >
                Создать пост
            </Button>
            <ul className='w-full flex flex-col items-start justify-between gap-3'>
                {loadedPosts.map((item: PostProps, index: number) => {
                    return (
                        <>
                            <Skeleton key={index} loading={isLoading} active>
                                <PostCard
                                    key={item?.id}
                                    {...item}
                                    handleEdit={() => {
                                        handleEditModal(item);
                                    }}
                                />
                            </Skeleton>
                        </>
                    );
                })}
            </ul>
            <Modal
                title='Создать пост'
                open={isCreateModalOpen}
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
            <Modal
                title='Редактировать пост'
                open={isEditModalOpen}
                onOk={handleSubmit(handleEditPost)}
                okText='Сохранить'
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
