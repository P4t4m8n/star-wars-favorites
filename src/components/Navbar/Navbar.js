import { NavLink } from "react-router-dom"
import ThemeButton from "../ThemeButton/ThemeButton"
import { useEntity } from "simpler-state"
import { theme } from "../../store/theme.store"

function Navbar() {
    const currTheme = useEntity(theme)

    return (
        <section className={"navbar " + currTheme}>
            <ThemeButton />
            <nav className="app-nav flex flex-column">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/film"}>Films</NavLink>
                <NavLink to={"/character"}>Characters</NavLink>
                <NavLink to={"/specie"}>Species</NavLink>
                <NavLink to={"/starship"}>Starships</NavLink>
                <NavLink to={"/planet"}>Planets</NavLink>
            </nav>
        </section>
    )
}

export default Navbar