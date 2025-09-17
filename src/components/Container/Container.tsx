interface ContainerProps {
    children: React.ReactNode;
}

export const ContainerBase = ({ children }: ContainerProps) => {
    return <div className='max-w-[996px] w-full mx-auto box-border flex flex-col'>{children}</div>;
};

export const ContainerCentered = ({ children }: ContainerProps) => {
    return (
        <div className='max-w-[996px] w-full h-full mx-auto box-border flex flex-col justify-center items-center'>
            {children}
        </div>
    );
};
