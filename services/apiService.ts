import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../constants/constants";
import { JwtPayload, SignInDto, User } from "@/context/AuthContext.static";


export const loginUser = async (signInDto: SignInDto): Promise<User> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signInDto),
    });
    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    const { access_token } = await response.json();
    const decodedToken: JwtPayload = jwtDecode(access_token);

    const userFromToken: User = {
        access_token,
        id: decodedToken.sub || '',
        email: decodedToken.email || '',
    };

    return userFromToken;
};


export const registerUser = async (signInDto: SignInDto): Promise<User> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signInDto),
    });

    const { access_token } = await response.json();
    const decodedToken: JwtPayload = jwtDecode(access_token);

    const userFromToken: User = {
        access_token,
        id: decodedToken.sub || '',
        email: decodedToken.email || '',
    };

    return userFromToken;
};
