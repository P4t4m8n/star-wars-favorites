import { NavLink } from "react-router-dom"
import ThemeButton from "../ThemeButton/ThemeButton"


function Navbar() {

    return (
        <section className="navbar flex flex-column">
            <ThemeButton />
            <nav className="flex flex-column">
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