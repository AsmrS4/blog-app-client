import type { PostProps } from '@models/Post';
import { dateTimeFormatter } from '@utils/utils';
import { Tooltip } from 'antd';

export const PostCard = (props: PostProps) => {
    return (
        <li
            id={props.id}
            className='flex flex-col items-start justify-center border border-neutral-300 rounded-lg w-full shadow-xs'
        >
            <div className='header flex flex-row py-2 px-3 justify-between items-center w-full'>
                <span className='text-md font-semibold'>{props?.title}</span>
                <span className='text-xs font-semibold text-center'>{props?.author?.username}</span>
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
                        placement='bottom'
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
