import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostProps } from "@models/Post";

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
        },
        removePost: (state: PostsInit, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(item => item.id !== action.payload);
        },
        setEditedPost: (state: PostsInit, action: PayloadAction<PostProps>) => {
            state.posts = state.posts.map(item => {
                if(item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload
                    }
                }
                return item;
            })
        }, 
        setNewPost: (state: PostsInit, action: PayloadAction<PostProps>) => {
            state.posts = [action.payload, ...state.posts]
        }
    }
});

export const {setPosts, changeStatus, removePost, setEditedPost, setNewPost} = postsSlice.actions;
export default postsSlice.reducer;