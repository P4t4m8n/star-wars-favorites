import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
  return (
    <li className='movie-item' key={movie.episodeId}>
      {/* //Call back props was not sent to parent */}
      <img src={movie.imgUrl} alt=''></img>
      <Link to={`/${movie.episodeId}`}>
        {movie.title}
      </Link>

    </li>
  );
}

export default MovieItem; 