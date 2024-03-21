import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import MovieList from "../components/MovieList/MovieList";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { movieService } from "../services/movie.service";
import { fetchMovieImages } from "../services/api";



export function MovieIndex() {

    const [movies, setMovies] = useState(null)
    const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const [favorites, setFavorites] = useState(initialFavorites);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        loadMovies();
    }, []);

    async function loadMovies() {
        try {
            const movies = await movieService.getMovies()
            setMovies(movies)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        }
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleFavorite = (movie) => {
        if (favorites.some(fav => fav.episode_id === movie.episode_id)) {
            setFavorites(favorites.filter(fav => fav.episode_id !== movie.episode_id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    function handleMovieSelect(movie) {
        setSelectedMovie(movie);
    }
    if (!movies) return <Loading message="Loading Movies..." />
    const backgroundImage = selectedMovie ? `url('/imgs/${selectedMovie.title}.jpg')` : `url('/imgs/stars.jpg')`

    function test() {
       const t =  fetchMovieImages('A New Hope')
       console.log("t:", t)
    }

    return (
        <section className="app flex flex-column" style={{ backgroundImage: backgroundImage }}>
            <button onClick={test}>!!!!!!!!!!!!!!!!!!!!!!!!!</button>
            {selectedMovie && <MovieDetails favorites={favorites} movie={selectedMovie} onFavoriteToggle={handleFavorite} />}
            <MovieList onMovieSelect={handleMovieSelect} movies={movies} />
        </section>
    )
}