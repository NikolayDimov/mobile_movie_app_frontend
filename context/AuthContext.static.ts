export interface User {
    uid?: string;
    access_token: string;
    id: string;
    email: string | null;
}

export interface JwtPayload {
    sub: string;
    email: string;
}

export interface SignInDto {
    email: string;
    password: string;
}