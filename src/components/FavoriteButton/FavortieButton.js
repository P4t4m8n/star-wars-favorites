import { useEntity } from "simpler-state"
import { StarSvg } from "../../services/icon.service"
import { favorites, updateFavorite } from "../../store/favorite.store"


function FavoriteButton({ itemId }) {
    const currFavorites = useEntity(favorites)
    console.log("currFavorites:", currFavorites)
    const isFavorite = currFavorites.some(item => item === itemId)

    return (
        <button className='fav-btn' onClick={() => updateFavorite(itemId)}          >
            {isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
        </button>

    )
}
export default FavoriteButton