import { createContext, useState } from "react";
import Loading from "../components/Loading/Loading";
import MovieList from "../components/ItemList/ItemsList";
import { movieService } from "../services/movie.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export const BackgroundItemContext = createContext({
    selectedItemName: 'stars',
    updateBackgroundImg: () => { }
})

function ItemIndex() {

    const [items, setItems] = useState(null)
    const [backgroundImg, setBackgroundImg] = useState('stars')
    useEffectUpdate(loadItems, [])
    const location = useLocation()
    const itemType = location.pathname
    console.log("itemType:", itemType)
    const { theme } = useTheme()

    async function loadItems() {
        try {
            const movies = await movieService.getMovies()
            setItems(movies)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        }
    }

    const updateBackgroundImg = (newName) => {
        setBackgroundImg(newName);
    }

    if (!items) return <Loading message="Loading Movies..." />

    return (
        <section className={`app flex flex-column ${theme}`} style={{ backgroundImage: `url('/imgs/${backgroundImg}.jpg')` }}>
            <BackgroundItemContext.Provider value={{ selectedItemName: backgroundImg, updateBackgroundImg }} >
                <Outlet />
            </BackgroundItemContext.Provider>
            <MovieList items={items} />
        </section>
    )
}

export default ItemIndex