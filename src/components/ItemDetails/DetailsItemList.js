import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { itemService } from '../../services/item.service'
import Loading from '../Loading/Loading'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'

function DetailsItemList({ items }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [loadedItems, setLoadedItems] = useState(null)
    useEffectUpdate(loadItems)

    function loadItems() {
        const _items = items.map(item => {
            return itemService.getItemById(item) 
        })
        setLoadedItems(_items)
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (!loadedItems) return (<Loading />)

    const itemsPerPage = 5
    const totalPages = Math.ceil(loadedItems.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = loadedItems.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
            <ul className="details-list flex">
                {
                    currentItems.map(item => (
                        <li className="details-item-list" key={item.id}>
                            <Link to={`/${item.type}/${item.id}`}>
                                <img src={item.imgUrl} alt={item.name}></img>
                                <h5>{item.name}</h5>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="pagination flex">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{"<<"}</button>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{">>"}</button>
            </div>
        </>
    )
}

export default DetailsItemList
