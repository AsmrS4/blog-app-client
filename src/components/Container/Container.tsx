interface ContainerProps {
    children: React.ReactNode;
}
interface SizeProps {
    size: string;
}

export const ContainerBase = ({ children }: ContainerProps) => {
    return (
        <div className='max-w-[996px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4'>
            {children}
        </div>
    );
};

export const ContainerCentered = ({ children }: ContainerProps) => {
    return (
        <div className='max-w-[996px] w-full h-full mx-auto box-border flex flex-col justify-center items-center'>
            {children}
        </div>
    );
};

export const ContainerCustom = ({ size, children }: ContainerProps & SizeProps) => {
    let style = '';
    switch (size) {
        case 'xs':
            style +=
                'max-w-[324px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 py-8';
            break;
        case 'sm':
            style +=
                'max-w-[468px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 py-8';
            break;
        case 'md':
            style +=
                'max-w-[524px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 py-8';
            break;
        case 'lg':
            style +=
                'max-w-[768px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 pb-8';
            break;
        case 'xl':
            style +=
                'max-w-[996px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 pb-8';
            break;
        default:
            style +=
                'max-w-[996px] w-full mx-auto box-border flex flex-col items-start justify-between gap-4 pb-8';
            break;
    }
    return <div className={style}>{children}</div>;
};
