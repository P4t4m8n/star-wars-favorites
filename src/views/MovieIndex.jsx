import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import MovieList from "../components/MovieList/MovieList";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { movieService } from "../services/movie.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";



export function MovieIndex() {

    const [movies, setMovies] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffectUpdate(loadMovies, [])

    async function loadMovies() {
        try {
            const movies = await movieService.getMovies()
            setMovies(movies)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        }
    }

    const handleFavorite = (movie) => {
        movie.isFavorite = !movie.isFavorite
        const updatedMovie = movieService.updateMovie(movie)
        setMovies(prevMovies =>
            prevMovies.map(_movie =>
                _movie.episodeId === movie.episodeId ? updatedMovie : _movie))
    };

    function handleMovieSelect(movie) {
        setSelectedMovie(movie);
    }
    if (!movies) return <Loading message="Loading Movies..." />
    const backgroundImage = selectedMovie ? `url('/imgs/${selectedMovie.title}.jpg')` : `url('/imgs/stars.jpg')`

    return (
        <section className="app flex flex-column" style={{ backgroundImage: backgroundImage }}>
            {/* <button onClick={test}>!!!!!!!!!!!!!!!!!!!!!!!!!</button> */}
            {selectedMovie && <MovieDetails movie={selectedMovie} onFavoriteToggle={handleFavorite} />}
            <MovieList onMovieSelect={handleMovieSelect} movies={movies} />
        </section>
    )
}