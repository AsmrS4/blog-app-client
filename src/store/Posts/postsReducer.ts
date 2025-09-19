import type { PostProps } from "@models/Post";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PostsInit {
    posts: Array<PostProps>
    isLoading: boolean
}

const initialState = {
    posts: [],
    isLoading: true
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        setPosts: (state: PostsInit, action: PayloadAction<Array<PostProps>>) => {
            state.posts = action.payload;
            state.isLoading = false;
        },
        changeStatus: (state: PostsInit, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const {setPosts, changeStatus} = postsSlice.actions;
export default postsSlice.reducer;