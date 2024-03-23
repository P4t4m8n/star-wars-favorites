import { useEntity } from "simpler-state"
import { theme } from "../../../store/theme.store"
import DetailsItemList from "../DetailsItemList"
import DetailsModal from "../DetailsModal"
import { useState } from "react"
import DetailsCharacterModalInfo from "./DetailsCharacterModalInfo"

function DetailsCharacter({ item }) {
    const currTheme = useEntity(theme)
    const [open, setOpen] = useState(false)

    const { imgUrl, films, starships, homeworld } = item

    return (
        <>
            <div className={'item-details-list ' + currTheme} onClick={() => setOpen(true)}>
                <img className="details-img" src={imgUrl} alt=''></img>
            </div>
            <div className='item-details-lists grid currTheme'>
                <div className="details-list-container flex flex-column">
                    <h3>Films: </h3>
                    <DetailsItemList items={films} />
                </div>
                <div className="details-list-container flex flex-column">
                    <h3>HomeWorld: </h3>
                    <DetailsItemList items={[homeworld]} />
                </div>

                <div className="details-list-container flex flex-column">
                    <h3>Starships: </h3>
                    <DetailsItemList items={starships} />
                </div>
            </div>
            {open && <DetailsModal setOpen={setOpen} children={<DetailsCharacterModalInfo item={item} />} />}
        </>
    )
}

export default DetailsCharacter