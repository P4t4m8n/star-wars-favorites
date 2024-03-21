import React from 'react';

function MovieItem({ movie, onMovieSelect }) {
  return (
    <li className='movie-item' key={movie.episodeId}>
      {/* //Call back props was not sent to parent */}
      <img src={movie.imgUrl} alt=''></img>
      <button onClick={() => onMovieSelect(movie)}>
        {movie.title}
      </button>
    </li>
  );
}

export default MovieItem;