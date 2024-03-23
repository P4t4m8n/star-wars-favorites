import React from 'react'
import ItemPreview from '../ItemPreview/ItemPreview'


function ItemsList({ items }) {

  
  return (
    <ul className='item-list flex'>
      {
        items.map(item => (
          <ItemPreview
            key={item.name}
            item={item}
          />
        ))

      }
    </ul>
  )
}

export default ItemsList
