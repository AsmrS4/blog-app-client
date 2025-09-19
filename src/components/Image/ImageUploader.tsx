import { Input, Image, Button } from 'antd';

interface ImageUploaderProps {
    imageUrl: string | null;
    setImageUrl: any;
}

const ImageUploader = ({ imageUrl, setImageUrl }: ImageUploaderProps) => {
    const handleChange = (value: string) => {
        setImageUrl(value);
    };
    const handleRemoveImage = () => {
        setImageUrl(null);
    };

    return (
        <div className='w-full flex flex-col items-start justify-between gap-2.5'>
            <div
                className='w-full flex flex-col justify-center items-center gap-2.5'
                onDoubleClick={handleRemoveImage}
            >
                {imageUrl && (
                    <div className='w-full overflow-hidden rounded-sm min-h-[100px] flex flex-col items-center justify-center relative gap-5'>
                        <Image
                            preview={false}
                            className='w-full rounded-sm'
                            src={imageUrl}
                            alt='Preview'
                        />
                    </div>
                )}
                <Input
                    placeholder='Введите URL изображения'
                    value={imageUrl || ''}
                    size='large'
                    onChange={(event) => handleChange(event.target.value)}
                    className='box-border w-full py-2.5 px-4 text-lg font-medium'
                />
            </div>
        </div>
    );
};

export default ImageUploader;
