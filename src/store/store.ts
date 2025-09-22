import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './Auth/authReducer';
import postsReducer from './Posts/postsReducer';

const rootReducer = combineReducers({
    authReducer: authSlice,
    postsReducer: postsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']