import axios from 'axios';

const api = axios.create();
const RAPID_KEY = '4df2ef2181msh75591dbcc080134p16287ejsn1217057be836'

export const fetchData = async (url) => {
  const response = await api({
    url,
    method: 'GET'
  });
  return response.data;
};

export const fetchMovieImages = async (movieName) => {
  const options = {
    method: 'GET',
    url: 'https://movies-api14.p.rapidapi.com/search',
    params: {
      query: 'Star Wars ' + movieName
    },
    headers: {
      'X-RapidAPI-Key': RAPID_KEY,
      'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data.contents[0].backdrop_path
  }
  catch (error) {
    console.error(error);
  }
};

export const fetchItemImages = async (type, itemName) => {
  const changedName = encodeURIComponent(itemName)
  const UpdatedType = getTypeForUrl(type)
  const url = `https://starwars-databank-server.vercel.app/api/v1/${UpdatedType}/name/${changedName}`
  try {
    const response = await axios.get(url)
    return response.data[0]?.image || 'https://res.cloudinary.com/dpnevk8db/image/upload/v1711111515/Awesome_Star_Wars_Logo_Wallpapers_-_WallpaperAccess_zbkvzl.jpg'
  } catch (error) {
    console.error(error);
  }
}

function getTypeForUrl(type) {
  switch (type) {
    case 'planet':
      return 'locations'
    case 'specie':
      return 'species'
    case 'starship':
      return 'vehicles'
    default:
      return 'characters'

  }
}




