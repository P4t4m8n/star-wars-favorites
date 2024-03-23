import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { itemService } from '../../services/item.service';
import Loading from '../Loading/Loading';
import DetailsFilm from './DetailsFilm/DetailsFilm';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';
import { theme } from '../../store/theme.store';
import { useEntity } from 'simpler-state';
import DetailsCharacter from './DetailsCharacter/DetailsCharacter';
import DetailsPlanet from './DetailsPlanet/DetailsPlanet';
import DetailsSpecie from './DetailsSpecie/DetailsSpecie';
import DetailsStarship from './DetailsStarship/DetailsStarship';
import FavoriteButton from '../FavoriteButton/FavortieButton';

function ItemDetails() {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const currTheme = useEntity(theme)
  useEffectUpdate(loadItem, [id], { id })

  function loadItem({ id }) {
    const _item = itemService.getItemById(id)
    setItem(_item)
  }

  if (!item) return (<Loading />)
  return (
    <div className={`item-details grid ${currTheme} `}>
      <FavoriteButton itemId={item.id} />
      <DynamicDetailsCmp item={item} cmpType={item.type} />
    </div>
  )
}

function DynamicDetailsCmp(props) {

  switch (props.cmpType) {
    case 'character':
      return <DetailsCharacter {...props} />
    case 'planet':
      return <DetailsPlanet {...props} />
    case 'specie':
      return <DetailsSpecie {...props} />
    case 'starship':
      return <DetailsStarship {...props} />
    default:
      return <DetailsFilm {...props} />
  }
}

export default ItemDetails