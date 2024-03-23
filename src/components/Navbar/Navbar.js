import { NavLink } from "react-router-dom"
import ThemeButton from "../ThemeButton/ThemeButton"
import { useEntity } from "simpler-state"
import { theme } from "../../store/theme.store"
import { useState } from "react"
import { HamburgerSvg } from "../../services/icon.service"

function Navbar() {
    const currTheme = useEntity(theme)
    const [open, setOpen] = useState(false)
    const isSlideIn = open ? 'slide' : ''

    return (
        <section className={`navbar flex flex-column ${currTheme} ${isSlideIn}`}>
            <div className="actions flex">
                <button className="ham-menu" onClick={() => setOpen(!open)}><HamburgerSvg /></button>
                <ThemeButton />
            </div>
            <nav className={`app-nav flex flex-column ${isSlideIn}`}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/film"}>Films</NavLink>
                <NavLink to={"/character"}>Characters</NavLink>
                <NavLink to={"/specie"}>Species</NavLink>
                <NavLink to={"/starship"}>Starships</NavLink>
                <NavLink to={"/planet"}>Planets</NavLink>
                <NavLink to={"/favorite"}>Favorites</NavLink>
            </nav>
        </section>
    )
}

export default Navbar