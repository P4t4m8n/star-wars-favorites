import { entity } from "simpler-state"
import { FAVORITE_DB, itemService } from "../services/item.service"

export const favorites = entity([])

const loadFavorites = async () => {
    const savedFavorites = await itemService.getItems(FAVORITE_DB)
    favorites.set(savedFavorites || [])
}

export const getFavorites = () => {
    const _favorites = favorites.get()
    const loadFavorites = _favorites.map( fav =>  itemService.getItemById(fav))
    return loadFavorites
}

export const updateFavorite = (itemId) => {
    favorites.set((value) => {
        const idx = value.findIndex(item => item === itemId)
        // Cloning the array to avoid direct mutations
        let newValue = [...value]
        if (idx < 0) {
            // Item not found, add it to the favorites
            newValue.push(itemId)
        } else {
            // Item found, remove it from the favorites
            newValue.splice(idx, 1)
        }
        itemService.saveItems(FAVORITE_DB, newValue)
        return newValue
    })
}

loadFavorites()