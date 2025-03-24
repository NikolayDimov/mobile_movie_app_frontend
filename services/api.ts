import { getUser } from "@/utils/getUser";

export const getMovies = async () => {
    const user = await getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    // let url = 'http://localhost:3000/movies';
    let url = 'http://192.168.1.37:3000/movies';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
};


export const getMovieDetails = async (movie_id: string) => {
    const user = await getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`http://192.168.1.37:3000/movies/${movie_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
};