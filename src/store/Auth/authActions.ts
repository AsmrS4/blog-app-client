import axios from "axios";
import type { Dispatch } from "redux";
import { setSession } from "./authReducer";
import type { AuthResponse } from "@models/Auth";
import type { AuthProps } from "@models/User";

export const loginUser = (form: AuthProps) => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${'http://localhost:8800/api/v1'}/auth/sign-in`,
            method: 'POST',
            data: {
                ...form
            }
        })
        const data: AuthResponse = await response.data;
        dispatch(setSession(data));
    } catch (error) {
        throw error;
    }
}