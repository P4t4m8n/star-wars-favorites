import React from 'react';
import { useFlip } from '../../hooks/useFlip';
import { FlipSvg } from '../../services/icon.service';
import { useTheme } from '../../hooks/useTheme';
import PreviewCharacter from './PreviewCharacter/PreviewCharacter';
import PreviewPlanet from './PreviewPlanet/PreviewPlanet';
import PreviewSpecie from './PreviewSpecie/PreviewSpecie';
import PreviewFilm from './PreviewFilm/PreviewFilm';
import PreviewStarship from './PreviewStarship/PreviewStarship';

function ItemPreview({ item }) {
  const [flip, toggleFlip] = useFlip();
  const { theme } = useTheme()
  const { name, type } = item;

  return (
    <li className={`${type}-preview ${flip ? 'flipped' : ''} ${theme}`} key={name}>
      <button className='flip-btn' onClick={toggleFlip}><FlipSvg /></button>
      <DynamicPreviewCmp item={item} cmpType={type} />
    </li>
  );
}

function DynamicPreviewCmp(props) {

  switch (props.cmpType) {
    case 'character':
      return <PreviewCharacter {...props} />
    case 'planet':
      return <PreviewPlanet {...props} />
    case 'specie':
      return <PreviewSpecie {...props} />
    case 'starship':
      return <PreviewStarship {...props} />

    default:
      return <PreviewFilm {...props} />
  }
}

export default ItemPreview;
