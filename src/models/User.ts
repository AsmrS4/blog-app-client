export interface UserProps {
    id: string,
    username: string,
    createTime: string
}

export interface AuthProps {
    username: string;
    password: string;
}

export interface RegisterProps {
    username: string;
    password: string;
    confirmPassword: string;
}