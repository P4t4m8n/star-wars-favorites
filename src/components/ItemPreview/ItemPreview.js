import React from 'react';
import { Link } from 'react-router-dom';
import { useFlip } from '../../hooks/useFlip';
import { FlipSvg } from '../../services/icon.service';
import { useTheme } from '../../hooks/useTheme';

function ItemPreview({ item }) {
  const [flip, toggleFlip] = useFlip();
  const { theme } = useTheme()

  const { imgUrl, episodeId, title: name, release_date } = item;

  return (
    <li className={`movie-item ${flip ? 'flipped' : ''} ${theme}`} key={episodeId}>
      <button className='flip-btn' onClick={toggleFlip}><FlipSvg /></button>
      <div className='movie-item-front'>
        <img src={imgUrl} alt={name} />
        <Link to={`/${episodeId}`}>{name}</Link>
      </div>
      <div className='movie-item-back flex flex-column'>
        <h2>{name}</h2>
        <h3>{release_date||''}</h3>
        <h4>{episodeId||''}</h4>
      </div>
    </li>
  );
}

export default ItemPreview;
