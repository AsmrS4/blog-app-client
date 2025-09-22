import axios, { AxiosError } from 'axios';
import { Button, Dropdown, Tooltip, type MenuProps } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    HeartOutlined,
    HeartFilled,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ErrorToast } from '@components/Toasts';
import { useAppSelector } from '@hooks/useAppSelector';
import type { PostProps } from '@models/Post';
import { deletePost } from '@store/Posts/postsAction';
import { clearSession } from '@store/Auth/authReducer';
import { dateTimeFormatter } from '@utils/utils';
import { useEffect, useState } from 'react';

export const PostCard = (props: PostProps & { handleEdit: () => void }) => {
    const { user } = useAppSelector((state) => state.authReducer);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [hasLike, setHasLike] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const handleDeletePost = async () => {
        try {
            await dispatch(deletePost(props.id));
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401 || error.status === 403) {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                } else {
                    return ErrorToast('Не удалось обработать запрос');
                }
            }
            return ErrorToast('Что-то пошло не так');
        }
    };
    const handleSetLike = async () => {
        try {
            await axios({
                url: `${'http://localhost:8800/api/v1'}/posts/like/${props.id}`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            setHasLike(true);
            setLikeCount((prev) => ++prev);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401 || error.status === 403) {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                } else {
                    return ErrorToast('Не удалось обработать запрос');
                }
            }
            return ErrorToast('Что-то пошло не так');
        }
    };
    const handleRemoveLike = async () => {
        try {
            await axios({
                url: `${'http://localhost:8800/api/v1'}/posts/like/${props.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            setHasLike(false);
            setLikeCount((prev) => (prev > 0 ? --prev : 0));
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401 || error.status === 403) {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                } else {
                    return ErrorToast('Не удалось обработать запрос');
                }
            }
            return ErrorToast('Что-то пошло не так');
        }
    };
    const handleFetchLikes = async () => {
        try {
            const response = await axios({
                url: `${'http://localhost:8800/api/v1'}/posts/count/${props.id}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            const { hasLike, count } = await response.data;
            setHasLike(hasLike);
            setLikeCount(count);
        } catch (error) {}
    };
    const handleClick = async () => {
        if (hasLike) {
            handleRemoveLike();
        } else {
            handleSetLike();
        }
    };
    useEffect(() => {
        handleFetchLikes();
    }, []);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button
                    className='w-full flex flex-row items-start bg-inherit'
                    icon={<EditOutlined />}
                    color='default'
                    variant='link'
                    onClick={props.handleEdit}
                >
                    Изменить
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button
                    className='w-full flex flex-row items-start bg-inherit'
                    color='danger'
                    icon={<DeleteOutlined />}
                    variant='link'
                    onClick={handleDeletePost}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    return (
        <li
            id={props.id}
            className='flex flex-col items-start justify-center border border-neutral-300 rounded-lg w-full shadow-xs'
        >
            <div className='header flex flex-row py-2 px-3 justify-between items-center w-full'>
                <span className='text-md font-semibold'>{props?.title}</span>
                <div className='flex flex-row items-center justify-between gap-2'>
                    <span className='text-xs font-semibold text-center'>
                        {user?.id === props?.author?.id
                            ? props?.author?.username + ' (Вы)'
                            : props?.author?.username}
                    </span>
                    {user?.id === props?.author?.id && (
                        <Dropdown menu={{ items }} placement='bottomRight' arrow>
                            <Button size='small' shape='circle' icon={<MoreOutlined />} />
                        </Dropdown>
                    )}
                </div>
            </div>
            {props?.image && <img src={props?.image || undefined} alt='image' />}

            <div className='body flex flex-col p-4'>
                <pre className='text-wrap text-sm font-normal'>{props?.text}</pre>
            </div>
            <div className='footer flex flex-row w-full justify-between py-2 px-3'>
                <span className='cursor-pointer font-medium text-sm' onClick={handleClick}>
                    {hasLike ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}{' '}
                    {likeCount}
                </span>
                <div className='flex flex-col justify-between items-end'>
                    <Tooltip
                        className='text-xs font-normal'
                        color='#fff'
                        placement='bottomRight'
                        title={
                            props?.modifiedTime &&
                            'Изменено: ' + dateTimeFormatter(props?.modifiedTime)
                        }
                    >
                        <span className='text-xs font-normal'>
                            {dateTimeFormatter(props?.createTime)}
                            {props?.modifiedTime && ' (Ред.)'}
                        </span>
                    </Tooltip>
                </div>
            </div>
        </li>
    );
};
