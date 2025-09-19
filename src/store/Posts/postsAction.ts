import axios, { AxiosError } from "axios";
import type { Dispatch } from "redux";
import { changeStatus, setPosts } from "./postsReducer";
import { clearSession } from "@store/Auth/authReducer";

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