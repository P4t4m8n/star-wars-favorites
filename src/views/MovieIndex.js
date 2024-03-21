import { useState } from "react";
import Loading from "../components/Loading/Loading";
import MovieList from "../components/MovieList/MovieList";
import { movieService } from "../services/movie.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { Outlet } from "react-router-dom";

function MovieIndex() {

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

    function handleMovieSelect(movie) {
        setSelectedMovie(movie);
    }
    if (!movies) return <Loading message="Loading Movies..." />
    const backgroundImage = selectedMovie ? `url('/imgs/${selectedMovie.title}.jpg')` : `url('/imgs/stars.jpg')`

    return (
        <section className="app flex flex-column" style={{ backgroundImage: backgroundImage }}>
            <Outlet/>
            <MovieList onMovieSelect={handleMovieSelect} movies={movies} />
        </section>
    )
}

export default MovieIndex