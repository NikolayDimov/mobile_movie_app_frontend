export interface User {
    access_token: string;
    id: string;
    email: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
}

export interface SignInDto {
    email: string;
    password: string;
}