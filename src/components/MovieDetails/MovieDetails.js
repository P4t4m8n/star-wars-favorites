import React, { useContext, useState } from 'react';
import { StarSvg } from '../../services/icon.service';
import { useParams } from 'react-router-dom';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';
import { movieService } from '../../services/movie.service';
import Loading from '../Loading/Loading';
import { BackgroundTitleContext } from '../../views/MovieIndex';

function MovieDetails() {
  const [movie, setMovie] = useState()
  let { episodeId } = useParams()

  useEffectUpdate(loadMovie, [episodeId], { episodeId })
  const { updateBackgroundImg } = useContext(BackgroundTitleContext)

  function loadMovie({ episodeId }) {
    const _movie = movieService.getMovie(episodeId)
    setMovie(_movie)
    updateBackgroundImg(_movie.title)
  }

  const handleFavorite = (movie) => {
    movie.isFavorite = !movie.isFavorite
    const updatedMovie = movieService.updateMovie(movie)
    setMovie({ ...updatedMovie })
  };

  if (!movie) return <Loading message='Loading Movie' />


  return (
    <div className='movie-details flex'>
      <img src={movie.imgUrl} alt=''></img>
      <div className='movie-info'>
        <h2>{movie.title}</h2>
        <button onClick={() => handleFavorite(movie)}
        >
          {
            movie.isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
        </button>
      </div>
      <p><strong>Episode:</strong> {movie.episodeId} </p>
    </div>
  );
}

export default MovieDetails;