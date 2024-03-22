import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlipSvg, StarSvg } from '../../services/icon.service';
import { useParams } from 'react-router-dom';
import { movieService } from '../../services/movie.service';
import Loading from '../Loading/Loading';
import { BackgroundItemContext } from '../../views/ItemIndex';
import { useTheme } from '../../hooks/useTheme';
import { useFlip } from '../../hooks/useFlip';

function ItemDetails() {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const { theme } = useTheme()
  const [flip, toggleFlip] = useFlip();
  const elRef = useRef()

  const { updateBackgroundImg } = useContext(BackgroundItemContext)

  useEffect(() => {
    loadPage(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function loadPage(id) {
    const _item = loadItem(id)
    updateBackgroundImg(_item.name)
    startAnimation()
  }

  function loadItem(id) {
    const _item = movieService.getMovie(id)
    setItem(_item)
    return _item
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
    setItem({ ...updatedMovie })
  };

  if (!item) return <Loading message='Loading Movie' />

  return (
    <div className={`movie-details flex ${flip ? 'flipped' : ''} ${theme} `}>
      <button className='flip-btn' onClick={toggleFlip}><FlipSvg /></button>
      <div className='movie-details-front'>
        <img src={item.imgUrl} alt=''></img>
        <div className='movie-info'>
          <h2>{item.name}</h2>
          <button onClick={() => handleFavorite(item)}
          >
            {
              item.isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
          </button>
        </div>
        <div className='opening_crawl'>
          <p ref={elRef} className='scroll-text'>
            {item.opening_crawl || ''}
          </p>
        </div>
      </div>

      <div className='movie-details-front'>

      </div>
    </div>
  );
}

export default ItemDetails;