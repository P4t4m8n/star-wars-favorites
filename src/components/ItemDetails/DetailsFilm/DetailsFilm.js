import { useRef, useState } from "react";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate";
import { useEntity } from "simpler-state";
import { theme } from '../../../store/theme.store'
import DetailsItemList from "../DetailsItemList";
import DetailsModal from "../DetailsModal";
import DetailsModalInfo from "./DetailsFilmModalInfo";

function DetailsFilm({ item }) {
    const elRef = useRef()
    const currTheme = useEntity(theme)
    const [open, setOpen] = useState(false)

    useEffectUpdate(startAnimation)

    function startAnimation() {
        const element = elRef.current;
        if (!element) return
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = '';
    }

    const { imgUrl, opening_crawl, characters, planets, species, starships } = item
  
    return (
        <>

            <div className={'film-details ' + currTheme} onClick={() => setOpen(true)}>
                <img className="details-img" src={imgUrl} alt=''></img>
                <div className='opening_crawl'>
                    <p ref={elRef} className='scroll-text'>
                        {opening_crawl || ''}
                    </p>
                </div>
            </div>
            <div className='item-details-lists grid currTheme'>
                <div className="details-list-container flex flex-column">
                    <h3>Characters: </h3>
                    <DetailsItemList items={characters} />
                </div>
                <div className="details-list-container flex flex-column">
                    <h3>Planets: </h3>
                    <DetailsItemList items={planets} />
                </div>
                <div className="details-list-container flex flex-column">
                    <h3>Species: </h3>
                    <DetailsItemList items={species} />
                </div>
                <div className="details-list-container flex flex-column">
                    <h3>Starships: </h3>
                    <DetailsItemList items={starships} />
                </div>
            </div>
            {open && <DetailsModal setOpen={setOpen} children={<DetailsModalInfo item={item} />} />}
        </>
    )
}

export default DetailsFilm