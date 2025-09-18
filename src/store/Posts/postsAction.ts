import axios from "axios";
import type { Dispatch } from "redux";
import { changeStatus, setPosts } from "./postsReducer";

const fetchPosts = () => async(dispatch: Dispatch) => {
    try {
        dispatch(changeStatus(true));
        const response = await axios({
            url: `${'http://localhost:8800/api/v1'}/posts`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
        dispatch(setPosts(await response.data));
    } catch (error) {
        throw error;
    }
}