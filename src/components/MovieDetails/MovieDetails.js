import React from 'react';
import { StarSvg } from '../../services/icon.service';

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  if (!movie) return null;

  return (
    <div className='movie-details flex'>
      <img src={`/imgs/${movie.title}.jpg`} alt=''></img>
      <div className='movie-info'>
        <h2>{movie.title}</h2>
        <button onClick={() => onFavoriteToggle(movie)}
        >
          {
            favorites.some(fav => fav.episode_id === movie.episode_id) ? <StarSvg fill='white' /> : <StarSvg fill='none' />}

        </button>
      </div>
      <p><strong>Episode:</strong> {movie.episode_id} </p>
    </div>
  );
}

export default MovieDetails;