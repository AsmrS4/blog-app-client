import { AxiosError } from 'axios';
import { Button, Dropdown, Tooltip, type MenuProps } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ErrorToast } from '@components/Toasts';
import { useAppSelector } from '@hooks/useAppSelector';
import type { PostProps } from '@models/Post';
import { deletePost } from '@store/Posts/postsAction';
import { clearSession } from '@store/Auth/authReducer';
import { dateTimeFormatter } from '@utils/utils';

export const PostCard = (props: PostProps & { handleEdit: () => void }) => {
    const { user } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const handleEditPost = async () => {
        try {
        } catch (error) {}
    };
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
                <span>{}</span>
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
