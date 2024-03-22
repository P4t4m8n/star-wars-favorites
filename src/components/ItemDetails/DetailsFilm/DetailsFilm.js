import { useRef } from "react";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate";
import { useEntity } from "simpler-state";
import { theme } from '../../../store/theme.store'
import ItemsList from "../../ItemList/ItemsList";

function DetailsFilm({ item }) {
    console.log("item:", item)
    const elRef = useRef()
    const currTheme = useEntity(theme)

    useEffectUpdate(startAnimation)

    function startAnimation() {
        const element = elRef.current;
        if (!element) return
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = '';
    }

    const { imgUrl, name, opening_crawl, characters, planets, species, starships } = item

    return (
        <>
            <div className={'movie-details-front ' + currTheme}>
                <img src={imgUrl} alt=''></img>
                <div className='movie-info'>
                    <h2>{name}</h2>
                </div>
                <div className='opening_crawl'>
                    <p ref={elRef} className='scroll-text'>
                        {opening_crawl || ''}
                    </p>
                </div>
            </div>
            <div className='movie-details-front currTheme'>
                <div className="details-list-container flex">
                    <h3>"Characters: </h3>
                    <ItemsList item={characters} />
                </div>
                <div className="details-list-container flex">
                    <h3>"Planets: </h3>
                    <ItemsList item={planets} />
                </div>
                <div className="details-list-container flex">
                    <h3>"Species: </h3>
                    <ItemsList item={species} />
                </div>
                <div className="details-list-container flex">
                    <h3>"Starships: </h3>
                    <ItemsList item={starships} />
                </div>
            </div>
        </>
    )
}

export default DetailsFilm