import { useEntity } from "simpler-state"
import { theme } from "../../../store/theme.store"
import DetailsItemList from "../DetailsItemList";
import DetailsModal from "../DetailsModal";
import { useState } from "react";
import DetailsSpecieModalInfo from "./DetailsSpecieModalInfo";


function DetailsSpecie({ item }) {
    const currTheme = useEntity(theme)
    const [open, setOpen] = useState(false)

    const { imgUrl, films, characters } = item

    return (
        <>
            <div className={'item-details-list ' + currTheme} onClick={() => setOpen(true)}>
                    <img src={imgUrl} alt=''></img>
            </div>
            <div className='item-details-lists grid currTheme'>
                <div className="details-list-container flex flex-column">
                    <h3>Films: </h3>
                    <DetailsItemList items={films} />
                </div>
                <div className="details-list-container flex flex-column">
                    <h3>Characters: </h3>
                    <DetailsItemList items={characters} />
                </div>

            </div>

            {open && <DetailsModal setOpen={setOpen} children={<DetailsSpecieModalInfo item={item} />} />}
        </>
    )
}

export default DetailsSpecie