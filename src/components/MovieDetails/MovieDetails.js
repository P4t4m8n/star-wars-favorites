import React, { useContext, useEffect, useRef, useState } from 'react';
import { StarSvg } from '../../services/icon.service';
import { useParams } from 'react-router-dom';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';
import { movieService } from '../../services/movie.service';
import Loading from '../Loading/Loading';
import { BackgroundTitleContext } from '../../views/MovieIndex';

function MovieDetails() {
  const [movie, setMovie] = useState(null)
  let { episodeId } = useParams()
  const elRef = useRef()

  const { updateBackgroundImg } = useContext(BackgroundTitleContext)

  useEffect(() => {
    loadPage(episodeId)
  }, [episodeId])

  function loadPage(episodeId) {
    const _movie = loadMovie(episodeId)
    updateBackgroundImg(_movie.title)
    startAnimation()
  }

  function loadMovie(episodeId) {
    const _movie = movieService.getMovie(episodeId)
    setMovie(_movie)
    return _movie
  }

  function startAnimation() {
    const element = elRef.current;
    if (!element) return
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = '';
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
      <div className='opening_crawl'>
        <p ref={elRef} className='scroll-text'>
          {movie.opening_crawl}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;