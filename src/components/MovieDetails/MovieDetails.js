import React from 'react';
import { StarSvg } from '../../services/icon.service';

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  if (!movie) return null;

  return (
    <div className='movie-details flex'>
      <img src={movie.imgUrl} alt=''></img>
      <div className='movie-info'>
        <h2>{movie.title}</h2>
        <button onClick={() => onFavoriteToggle(movie)}
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