import React from 'react';

function MovieItem({ movie, onMovieSelect }) {
  return (
    <div key={movie.episode_id}>
      {/* //Call back props was not sent to parent */}
      <button onClick={() => onMovieSelect(movie)}>
        View {movie.title}
      </button>
    </div>
  );
}

export default MovieItem;