import React, { useState } from 'react';
import { FlipSvg, StarSvg } from '../../services/icon.service';
import { useParams } from 'react-router-dom';
import { itemService } from '../../services/item.service';
import Loading from '../Loading/Loading';
import { useFlip } from '../../hooks/useFlip';
import DetailsFilm from './DetailsFilm/DetailsFilm';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';
import { theme } from '../../store/theme.store';
import { useEntity } from 'simpler-state';

function ItemDetails() {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const [flip, toggleFlip] = useFlip();
  const currTheme = useEntity(theme)
  useEffectUpdate(loadItem, [id], { id })

  function loadItem({ id }) {
    const _item = itemService.getItemById(id)
    setItem(_item)
  }

  const handleFavorite = (item) => {
    item.isFavorite = !item.isFavorite
    const updatedItem = itemService.updateItem(item)
    setItem({ ...updatedItem })
  }

  if (!item) return <Loading message='Loading Movie' />
  const { type } = item
  return (
    <div className={`${type}-details flex ${flip ? 'flipped' : ''} ${currTheme} `}>
      <button className='flip-btn' onClick={toggleFlip}><FlipSvg /></button>
      <button onClick={() => handleFavorite(item)}          >
        {item.isFavorite ? <StarSvg fill='white' /> : <StarSvg fill='none' />}
      </button>
      <DynamicDetailsCmp item={item} cmdType={item.type} />
    </div>
  )
}

function DynamicDetailsCmp(props) {

  switch (props.cmpType) {
    default:
      return <DetailsFilm {...props} />
  }
}

export default ItemDetails