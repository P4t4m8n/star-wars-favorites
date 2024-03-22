import React from 'react';
import ItemPreview from '../ItemPreview/ItemPreview';


function ItemsList({ onItemSelect, items }) {

  return (
    <ul className='item-list flex'>
      {
        items.map(item => (
          <ItemPreview
            key={item.name}
            item={item}
            onItemSelect={onItemSelect} />
        ))

      }
    </ul>
  );
}

export default ItemsList;
