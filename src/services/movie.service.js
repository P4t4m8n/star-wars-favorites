import { fetchData, fetchMovieImages } from './api'

export const MOVIE_DB = 'movie_db' // Constant for the local storage key.
export const PLANETS_DB = 'planets_db' // Constant for the local storage key.
export const SPECIES_DB = 'species_db' // Constant for the local storage key.
export const STARSHIPS_DB = 'starships_db' // Constant for the local storage key.
export const CHARACTERS_DB = 'characters_db' // Constant for the local storage key.
export const BASE_API_URL = 'https://swapi.dev/api/'//Constant for main api url

export const movieService = {
    getMovies,
    updateMovie,
    getMovie,
    getItem,
}

// Asynchronously retrieves movies either from local storage or the API if not available in storage.
async function getMovies() {
    // Attempt to load movies from local storage.
    let results = _loadFromStorage(MOVIE_DB)
    // If movies exist in local storage, return them to avoid unnecessary API calls.
    if (results && results.length > 0) return results
    // If movies are not in local storage, fetch them from the API.
    try {
        const data = await fetchData(BASE_API_URL + 'films/')
        console.log("data:", data)
        // Initialize an empty array to hold the movie objects
        results = []
        let charactersDb = []
        let planetsDb = []
        let speciesDb = []
        let starshipsDb = []
        for (const movie of data.results) {
            try {
                const imgUrl = await fetchMovieImages(movie.title)
                const characters = await _getItems(movie.characters)
                const planets = await _getItems(movie.planets)
                const species = await _getItems(movie.species)
                const starships = await _getItems(movie.starships)
                // Construct and push the movie object into the results array
                results.push({
                    imgUrl,
                    name: movie.title,
                    opening_crawl: movie.opening_crawl,
                    release_date: movie.release_date,
                    isFavorite: false,
                    id: movie.episode_id,
                    characters,
                })
                charactersDb.push(...characters)
                planetsDb.push(...planets)
                speciesDb.push(...species)
                starshipsDb.push(...starships)
                // Wait for 10ms before proceeding to the next iteration to prevent error in the API
                await new Promise(resolve => setTimeout(resolve, 10))
            } catch (error) {
                console.error("Error fetching movie images:", error)
            }
        }

        const fixCharactersDb = _removeDuplicatesByProperty(charactersDb, 'name')
        const fixPlanetsDb = _removeDuplicatesByProperty(planetsDb, 'name')
        const fixSpeciesDb = _removeDuplicatesByProperty(speciesDb, 'name')
        const fixStarshipsDb = _removeDuplicatesByProperty(starshipsDb, 'name')

        _saveToStorage(MOVIE_DB, results)
        _saveToStorage(CHARACTERS_DB, fixCharactersDb)
        _saveToStorage(PLANETS_DB, fixPlanetsDb)
        _saveToStorage(SPECIES_DB, fixSpeciesDb)
        _saveToStorage(STARSHIPS_DB, fixStarshipsDb)

        return results
    } catch (error) {
        console.error("Error fetching movies from API:", error)
    }
}

function updateMovie(movie) {
    const movies = _loadFromStorage(MOVIE_DB)
    const idx = movies.findIndex(_movie => _movie.episodeId === movie.episodeId)
    if (idx < 0) return new Error('Unable to find movie to Update')
    movies.splice(idx, 1, movie)
    _saveToStorage(MOVIE_DB, movies)
    return movie
}

function getMovie(episodeId) {
    const movies = _loadFromStorage(MOVIE_DB)
    const movie = movies.find(movie => {
        return movie.episodeId === +episodeId
    })

    if (!movie) return new Error('Unable to find movie')
    return movie
}

//Asynchronously retrieves items base on items array in movie
async function _getItems(items) {
    try {
        // Collect all the promises
        const itemPromises = items.map(item => fetchData(item));
        // Waiting for them to resolve
        const itemObjArray = await Promise.all(itemPromises);
        // Transform each item in the array and add an id
        const transformedItemObjArray = itemObjArray.map((item, idx) => ({
            ...item,
            id: items[idx].charAt(items[idx].length - 2),
            isFavorite: false
        }));
        return transformedItemObjArray;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//Clean array from duplication
function _removeDuplicatesByProperty(arr, propName) {
    return arr.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t[propName] === item[propName]
        ))
    );
}

function getItem(type, name) {
    const items = _loadFromStorage(type)
    const item = items.find(item => {
        return item.name === +name
    })
    if (!item) return new Error('Unable to find movie')
    return item
}

function _saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function _loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}
