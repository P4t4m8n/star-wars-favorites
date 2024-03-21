import { fetchMovies } from '@/services/api';
import { fetchMovieImages } from './api';

const MOVIE_DB = 'movie_db'; // Constant for the local storage key.

export const movieService = {
    getMovies,
    updateMovie,
    getMovie
};

// Asynchronously retrieves movies either from local storage or the API if not available in storage.
async function getMovies() {
    // Attempt to load movies from local storage.
    let results = _loadFromStorage(MOVIE_DB);
    // If movies exist in local storage, return them to avoid unnecessary API calls.
    if (results && results.length > 0) return results;
    // If movies are not in local storage, fetch them from the API.
    try {
        const data = await fetchMovies();
        // Create promises for each movie to fetch its images and assemble movie objects.
        const promises = data.map(async (movie) => {
            try {
                // Fetch the image URL for the movie.
                const imgUrl = await fetchMovieImages(movie.title);
                // Construct and return a movie object with relevant properties.
                return {
                    imgUrl,
                    title: movie.title,
                    opening_crawl: movie.opening_crawl,
                    release_date: movie.release_date,
                    isFavorite: false,
                    episodeId: movie.episode_id,
                };
            } catch (error) {
                console.error("Error fetching movie images:", error);
            }
        });
        // Wait for all movie image fetch promises to resolve and update the results.
        results = await Promise.all(promises);
        // Save the fetched movie data to local storage.
        _saveToStorage(MOVIE_DB, results);
        return results;
    } catch (error) {
        console.error("Error fetching movies from API:", error);
    }
}

function updateMovie(movie) {
    const movies = _loadFromStorage(MOVIE_DB)
    const idx = movies.findIndex(_movie => _movie.episodeId === movie.episodeId)
    if (idx < 0) return new Error('Unable to find movie to Update')
    movies.splice(idx, 1, movie)
    _saveToStorage(MOVIE_DB, movies)
    return movie
}

function getMovie(episodeId) {
    const movies = _loadFromStorage(MOVIE_DB)
    const movie = movies.find(movie => {
        return movie.episodeId === +episodeId
    })

    if (!movie) return new Error('Unable to find movie')
    return movie
}

function _saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function _loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}