import type { UserProps } from "./User";

export interface AuthResponse {
    accessResponse: AccessResponse;
    profile: UserProps
}

export interface AccessResponse {
    accessToken: string;
}