import { fetchData, fetchMovieImages } from './api'

export const FILM_DB = 'films' // Constant for the local storage key.
export const PLANETS_DB = 'planets' // Constant for the local storage key.
export const SPECIES_DB = 'species' // Constant for the local storage key.
export const STARSHIPS_DB = 'starships' // Constant for the local storage key.
export const CHARACTERS_DB = 'characters' // Constant for the local storage key.
export const BASE_API_URL = 'https://swapi.dev/api/'//Constant for main api url

export const itemService = {
    makeData,
    updateItem,
    getItemById,
    getItemByName,
    getItems
}
function getItems(itemType) {
    const items = _loadFromStorage(itemType)
    return items
}
// Asynchronously retrieves items either from local storage or the API if not available in storage.
async function makeData() {
    // Attempt to load items from local storage.
    let results = _loadFromStorage(FILM_DB)
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
                    imgUrl,
                    name: item.title,
                    opening_crawl: item.opening_crawl,
                    release_date: item.release_date,
                    isFavorite: false,
                    id: item.episode_id,
                    species,
                    planets,
                    characters,
                    starships,
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
        const fixCharactersDb = _removeDuplicatesByProperty(charactersDb, 'name')
        const fixPlanetsDb = _removeDuplicatesByProperty(planetsDb, 'name')
        const fixSpeciesDb = _removeDuplicatesByProperty(speciesDb, 'name')
        const fixStarshipsDb = _removeDuplicatesByProperty(starshipsDb, 'name')

        _saveToStorage(FILM_DB, results)
        _saveToStorage(CHARACTERS_DB, fixCharactersDb)
        _saveToStorage(PLANETS_DB, fixPlanetsDb)
        _saveToStorage(SPECIES_DB, fixSpeciesDb)
        _saveToStorage(STARSHIPS_DB, fixStarshipsDb)

    } catch (error) {
        console.error("Error fetching items from API:", error)
    }
}

function updateItem(item) {
    const items = _loadFromStorage(FILM_DB)
    const idx = items.findIndex(_item => _item.episodeId === item.episodeId)
    if (idx < 0) return new Error('Unable to find item to Update')
    items.splice(idx, 1, item)
    _saveToStorage(FILM_DB, items)
    return item
}

function getItemById(itemType, id) {
    const items = _loadFromStorage(itemType)
    const item = items[id - 1]

    if (!item) return new Error('Unable to find item')
    return item
}

function getItemByName(type, name) {
    const items = _loadFromStorage(type)
    const item = items.find(item => {
        return item.name === +name
    })
    if (!item) return new Error('Unable to find item')
    return item
}


//Asynchronously retrieves items base on items array in item
async function _fetchItems(items, type) {
    try {
        // Collect all the promises
        const itemPromises = items.map(item => fetchData(item));
        // Waiting for them to resolve
        const itemObjArray = await Promise.all(itemPromises);
        // Transform each item in the array and add an id, isFavorite and type
        const transformedItemObjArray = itemObjArray.map((item, idx) => ({
            ...item,
            id: items[idx].charAt(items[idx].length - 2),
            isFavorite: false,
            type
        }));
        return transformedItemObjArray;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//Clean array from duplication lazy soultion
// function _removeDuplicatesByProperty(arr, propName) {
//     return arr.filter((item, index, self) =>
//         index === self.findIndex((t) => (
//             t[propName] === item[propName]
//         ))
//     )
// }

//More Efficent soultion
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
