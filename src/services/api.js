import axios from 'axios';

const api = axios.create();
const RAPID_KEY = '6c82988217msh8f39fa280af0c34p180759jsn2ae728cef461'

export const fetchMovies = async () => {
  const url = 'https://swapi.dev/api/films/'
  const response = await api({
    url,
    method: 'GET'
  });
  return response.data.results;
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




