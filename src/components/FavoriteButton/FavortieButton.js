import { StarSvg } from "../../services/icon.service"
import { itemService } from "../../services/item.service"


function FavoriteButton({ item }) {

    const handleFavorite = (item) => {
        item.isFavorite = !item.isFavorite
        itemService.updateItem(item)

    }

    return (
        <button className='fav-btn' onClick={() => handleFavorite(item)}          >
            {item.isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
        </button>

    )
}
export default FavoriteButton