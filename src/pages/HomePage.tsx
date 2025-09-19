import { ContainerCustom } from '@components/Container/Container';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import { useAppSelector } from '@hooks/useAppSelector';
import type { PostProps } from '@models/Post';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '@store/Posts/postsAction';
import { PostCard } from '@components/Post/PostCard';

export const HomePage = () => {
    const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
    const [loadedPosts, setPosts] = React.useState<Array<PostProps>>([]);
    const dispatch: any = useDispatch();
    React.useEffect(() => {
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
            <Button className='w-full' size='large' icon={<PlusOutlined />}>
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
        </ContainerCustom>
    );
};
