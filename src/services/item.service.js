import { fetchData, fetchItemImages, fetchMovieImages } from './api'
import { utilService } from './util.service'

export const FILM_DB = 'film' // Constant for the local storage key.
export const PLANETS_DB = 'planet' // Constant for the local storage key.
export const SPECIES_DB = 'specie' // Constant for the local storage key.
export const STARSHIPS_DB = 'starship' // Constant for the local storage key.
export const CHARACTERS_DB = 'character' // Constant for the local storage key.
export const FAVORITE_DB = 'favorite' // Constant for the local storage key.
export const BASE_API_URL = 'https://swapi.dev/api/'//Constant for main api url

export const itemService = {
    makeData,
    updateItem,
    getItemById,
    getItems,
    fixAttribute,
    saveItems,
    getFilterFromQueryString
}
function getItems(itemType, filterBy = {}) {
    let items = _loadFromStorage(itemType)
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        items = items.filter(item => regExp.test(item.name))
    }

    return items
}

function getFilterFromQueryString(searchParams) {
    const name = searchParams.get('name') || ''

    return {
        name,

    }
}

function saveItems(type, items) {
    _saveToStorage(type, items)
}
// Asynchronously retrieves items either from local storage or the API if not available in storage.
async function makeData() {
    // Attempt to load items from local storage.
    let results = _loadFromStorage(FILM_DB)
    //Build favorites
    let favorites = _loadFromStorage(FAVORITE_DB)
    if (!favorites) {
        favorites = []
        _saveToStorage(FAVORITE_DB, favorites)
    }
    // If items exist in local storage, return them to avoid unnecessary API calls.
    if (results && results.length > 0) return
    // If items are not in local storage, fetch them from the API.
    try {
        const data = await fetchData(BASE_API_URL + 'films/')
        // Initialize an empty arrays to hold the items objects
        results = []
        let charactersDb = []
        let planetsDb = []
        let speciesDb = []
        let starshipsDb = []
        for (const item of data.results) {
            try {
                //Fetch file imgaes
                const imgUrl = await fetchMovieImages(item.title)

                //Fetch all related data to a films return a Array of objects
                const characters = await _fetchItems(item.characters, 'character')
                const planets = await _fetchItems(item.planets, 'planet')
                const species = await _fetchItems(item.species, 'specie')
                const starships = await _fetchItems(item.starships, 'starship')
                // Construct and push the item object into the results array
                results.push({
                    ...item,
                    imgUrl,
                    name: item.title,
                    opening_crawl: item.opening_crawl,
                    release_date: item.release_date,
                    isFavorite: false,
                    id: utilService.makeId(),
                    endPoint: BASE_API_URL + 'films/' + item.episode_id + '/',
                    episodeNumber: item.episode_id,
                    type: 'film'
                })

                //Add fetched data into array
                charactersDb.push(...characters)
                planetsDb.push(...planets)
                speciesDb.push(...species)
                starshipsDb.push(...starships)
                // Wait for 10ms before proceeding to the next iteration to prevent error in the API
                await new Promise(resolve => setTimeout(resolve, 10))
            } catch (error) {
                console.error("Error fetching item images:", error)
            }
        }

        //Clean array from duplications
        let fixCharactersDb = _removeDuplicatesByProperty(charactersDb, 'name')
        let fixPlanetsDb = _removeDuplicatesByProperty(planetsDb, 'name')
        let fixSpeciesDb = _removeDuplicatesByProperty(speciesDb, 'name')
        let fixStarshipsDb = _removeDuplicatesByProperty(starshipsDb, 'name')


        _saveToStorage(FILM_DB, results)
        _saveToStorage(CHARACTERS_DB, fixCharactersDb)
        _saveToStorage(PLANETS_DB, fixPlanetsDb)
        _saveToStorage(SPECIES_DB, fixSpeciesDb)
        _saveToStorage(STARSHIPS_DB, fixStarshipsDb)

        fixAttribute()


    } catch (error) {
        console.error("Error fetching items from API:", error)
    }
}
function updateItem(item) {
    const items = _loadFromStorage(item.type)
    const idx = items.findIndex(_item => _item.id === item.id)
    if (idx < 0) return new Error('Unable to find item to Update')
    items.splice(idx, 1, item)
    _saveToStorage(item.type, items)
    return item
}
//Lazy search function
function getItemById(id) {
    const dbs = [FILM_DB, PLANETS_DB, SPECIES_DB, STARSHIPS_DB, CHARACTERS_DB]
    let foundItem = null
    // Loop through each database and search for the item
    for (let i = 0; i < dbs.length && !foundItem; i++) {
        const items = JSON.parse(localStorage.getItem(dbs[i])) || []
        foundItem = items.find(item => {
            return item.id === id
        })
    }
    if (!foundItem) {
        console.error(`Unable to find item ${id}`)
    }
    return foundItem
}
function getItemIdByUrl(type, url) {
    const items = _loadFromStorage(type)
    const item = items.find(_item => {
        return _item.endPoint === url
    })
    if (!item || !item.id) {
        // console.error('Item or item.id not found for url:', url);
        return null
    }
    return item.id
}
//Asynchronously retrieves items base on items array in item
async function _fetchItems(items, type) {
    try {
        // Collect all the promises for the initial fetch
        const itemPromises = items.map(item => fetchData(item))
        // Waiting for them to resolve
        const itemObjArray = await Promise.all(itemPromises)
        // Collect promises for the transformation and fetching images
        const transformationPromises = itemObjArray.map(async (item, idx) => {
            try {
                const imgUrl = await fetchItemImages(type, item.name)

                return {
                    ...item,
                    endPoint: items[idx],
                    id: utilService.makeId(),
                    isFavorite: false,
                    type,
                    imgUrl,
                }
            } catch (error) { throw error; }
        })
        // Await the transformation promises
        const transformedItemObjArray = await Promise.all(transformationPromises)
        return transformedItemObjArray
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}
//Clean array from duplication More Efficient soultion
function _removeDuplicatesByProperty(arr, propName) {
    const hashMap = {}
    const result = []
    for (const item of arr) {
        if (!hashMap.hasOwnProperty(item[propName])) {
            hashMap[item[propName]] = true
            result.push(item)
        }
    }
    return result
}
function _saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function _loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}
function fixAttribute() {
    const dbs = [PLANETS_DB, SPECIES_DB, STARSHIPS_DB, CHARACTERS_DB, FILM_DB]

    dbs.forEach(db => {
        const items = _loadFromStorage(db)
        const updatedItems = items.map(item => {

            let films = []
            let characters = []
            let planets = []
            let species = []
            let starships = []

            if (item.characters && item.characters.length > 0) {
                characters = item.characters.map(character => getItemIdByUrl(CHARACTERS_DB, character))
            }
            if (item.pilots && item.pilots.length > 0) {
                characters = item.pilots.map(item => getItemIdByUrl(CHARACTERS_DB, item))
                delete item.pilots;
            }
            if (item.people && item.people.length > 0) {
                characters = item.people.map(item => getItemIdByUrl(CHARACTERS_DB, item))
                delete item.people;
            }
            if (item.planets && item.planets.length > 0) {
                planets = item.planets.map(planet => getItemIdByUrl(PLANETS_DB, planet))
            }

            if (item.homeworld) {
                item.homeworld = getItemIdByUrl(PLANETS_DB, item.homeworld)
            }
            if (item.species && item.species.length > 0)
                species = item.species.map(specie => getItemIdByUrl(SPECIES_DB, specie))

            if (item.starships && item.starships.length > 0)
                starships = item.starships.map(starship => getItemIdByUrl(STARSHIPS_DB, starship))

            if (item.films && item.films.length > 0) {
                films = item.films.map(film => getItemIdByUrl(FILM_DB, film))
            }

            if (item.residents && item.residents.length > 0) {
                characters = item.residents.map(item => getItemIdByUrl(CHARACTERS_DB, item))
                delete item.residents
            }

            return {
                ...item,
                films,
                characters,
                planets,
                species,
                starships,
            }
        })

        _saveToStorage(db, updatedItems)
    })
}

