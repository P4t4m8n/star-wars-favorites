import { fetchMovies } from '@/services/api';
import { fetchMovieImages } from './api';


export const movieService = {
    getMovies
}

async function getMovies() {
    try {
        const data = await fetchMovies();
        console.log("data:", data)
        const promises = data.map(async (movie) => {
            try {

                const imgUrl = await fetchMovieImages(movie.title)
                return {
                    imgUrl,
                    title: movie.title,
                    episode: movie.episode_id,
                    opening_crawl: movie.opening_crawl,
                    release_date: movie.release_date
                }
            } catch (error) {
                console.error("Failed fetching movies:", error);
            }

        })
        const results = await Promise.all(promises)
        console.log("results:", results)
        return results
    } catch (error) {
        console.error("Failed fetching movies:", error);
    }

    function getFavorites() {

    }
}