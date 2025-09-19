import type { UserProps } from "./User";

export interface PostProps {
    id: string;
    title: string;
    text: string;
    image?: string | null;
    author: UserProps;
    createTime: string;
    modifiedTime?: string | null; 
}

export interface EditPostProps {
    title: string;
    text: string;
    image?: string
}