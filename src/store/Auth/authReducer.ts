import type { AuthResponse } from '@models/Auth';
import type { UserProps } from '@models/User';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface AuthInit  {
    token: string | null;
    user: UserProps | null;
    isAuth: boolean;
}

const initialState: AuthInit = {
    token: localStorage.getItem('ACCESS_TOKEN') || '',
    user: JSON.parse(localStorage.getItem('USER')||'{}') || null,
    isAuth: !!localStorage.getItem("ACCESS_TOKEN")
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state: AuthInit, action: PayloadAction<AuthResponse>) => {
            state.token = action.payload.accessResponse.accessToken
            state.user = action.payload.profile
            state.isAuth = true;
            localStorage.setItem('ACCESS_TOKEN', action.payload?.accessResponse.accessToken);
            localStorage.setItem('USER', JSON.stringify(action.payload.profile));
        },
        clearSession: (state: AuthInit) => {
            state.token = null;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER');
        }
    }
})

export const {setSession, clearSession} = authSlice.actions;
export default authSlice.reducer;