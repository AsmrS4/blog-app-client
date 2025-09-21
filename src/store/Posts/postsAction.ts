import axios, { AxiosError } from "axios";
import type { Dispatch } from "redux";

import { clearSession } from "@store/Auth/authReducer";
import type { EditPostProps, PostProps } from "@models/Post";
import { removePost, setEditedPost, setPosts } from "./postsReducer";

export const fetchPosts = () => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${'http://localhost:8800/api/v1'}/posts`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
        dispatch(setPosts(await response.data));
    } catch (error) {
        if(error instanceof AxiosError) {
            if(error.status == 401 || error.status == 403) {
                dispatch(clearSession());
                window.location.href='/auth/sign-in';
            }
        }
        throw error;
    }
}

export const editPost = (postId: string, post: EditPostProps) => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${'http://localhost:8800/api/v1'}/posts/${postId}`,
            method: 'PUT',
            data: {
                ...post
            }, 
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        });
        const editedPost: PostProps = await response.data;
        dispatch(setEditedPost(editedPost));
    } catch (error) {
        throw error
    }
}

export const deletePost = (postId:string) => async(dispatch:Dispatch) => {
    try {
        await axios({
            url: `${'http://localhost:8800/api/v1'}/posts/${postId}`,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        });
        dispatch(removePost(postId));
    } catch (error) {
        throw error
    }
}