import { useState } from "react"
import { StarSvg } from "../../services/icon.service"
import { itemService } from "../../services/item.service"


function FavoriteButton({ item }) {

    const [favorite, setFavorite] = useState(item.isFavorite)

    const handleFavorite = (item) => {
        item.isFavorite = !item.isFavorite
        itemService.updateItem(item)
        setFavorite(item.isFavorite)
    }

    return (
        <button className='fav-btn' onClick={() => handleFavorite(item)}          >
            {item.isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
        </button>

    )
}
export default FavoriteButton