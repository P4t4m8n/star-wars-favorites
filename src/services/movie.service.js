import { fetchMovies } from '@/services/api';


export const movieService = {
    getMovies
}

async function getMovies() {
    try {
        const data = await fetchMovies();
        return data
    } catch (error) {
        console.error("Failed fetching movies:", error);
    }

    function getFavorites() {

    }
}