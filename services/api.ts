import { getToken } from "@/utils/AsyncStorage";

export const getMovies = async () => {
    const token = await getToken();

    const response = await fetch('http://localhost:3000/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
};


export const getMovieDetails = async (movie_id: string) => {
    const token = await getToken();

    const response = await fetch(`http://localhost:3000/movies/${movie_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
};