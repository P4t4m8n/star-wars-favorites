import { NavLink } from "react-router-dom"
import ThemeButton from "../ThemeButton/ThemeButton"
import { useTheme } from "../../hooks/useTheme"


function Navbar() {
    const { theme } = useTheme()
    return (
        <section className={"navbar " + theme}>
            <ThemeButton />
            <nav className="app-nav flex flex-column">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/films"}>Films</NavLink>
                <NavLink to={"/characters"}>Characters</NavLink>
                <NavLink to={"/species"}>Species</NavLink>
                <NavLink to={"/starships"}>Starships</NavLink>
            </nav>
        </section>
    )
}

export default Navbar