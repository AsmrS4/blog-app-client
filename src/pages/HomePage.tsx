import { ContainerCustom } from '@components/Container/Container';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton } from 'antd';
import { useAppSelector } from '@hooks/useAppSelector';
import type { PostProps } from '@models/Post';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '@store/Posts/postsAction';
import { PostCard } from '@components/Post/PostCard';
import { useEffect, useState } from 'react';
import ImageUploader from '@components/Image/ImageUploader';

export const HomePage = () => {
    const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
    const [loadedPosts, setPosts] = useState<Array<PostProps>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const dispatch: any = useDispatch();
    const handleSubmit = () => {
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        if (isLoading) {
            setPosts([...Array(3)]);
            dispatch(fetchPosts());
        } else {
            setPosts(posts);
        }
        console.log(posts);
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
                onOk={handleSubmit}
                okText='Создать'
                cancelText='Отменить'
                cancelButtonProps={{ danger: true }}
                onCancel={handleClose}
            >
                <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </Modal>
        </ContainerCustom>
    );
};
