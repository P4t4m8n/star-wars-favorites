import { createContext, useState } from "react";
import Loading from "../components/Loading/Loading";
import MovieList from "../components/MovieList/MovieList";
import { movieService } from "../services/movie.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { Outlet } from "react-router-dom";
import ThemeButton from "../components/ThemeButton/ThemeButton";
import { useTheme } from "../hooks/useTheme";

export const BackgroundTitleContext = createContext({
    selectedMovieTitle: 'start',
    updateBackgroundImg: () => { }
})

function MovieIndex() {

    const [movies, setMovies] = useState(null)
    const [backgroundImg, setBackgroundImg] = useState('stars')
    useEffectUpdate(loadMovies, [])
    const { theme } = useTheme()

    async function loadMovies() {
        try {
            const movies = await movieService.getMovies()
            setMovies(movies)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        }
    }

    const updateBackgroundImg = (newTitle) => {
        setBackgroundImg(newTitle);
    }

    if (!movies) return <Loading message="Loading Movies..." />

    return (
        <section className={`app flex flex-column ${theme}`} style={{ backgroundImage: `url('/imgs/${backgroundImg}.jpg')` }}>
            <ThemeButton />
            <BackgroundTitleContext.Provider value={{ selectedMovieTitle: backgroundImg, updateBackgroundImg }} >
                <Outlet />
            </BackgroundTitleContext.Provider>
            <MovieList movies={movies} />
        </section>
    )
}

export default MovieIndex