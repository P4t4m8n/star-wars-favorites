import { useState } from "react";
import Loading from "../components/Loading/Loading";
import ItemsList from "../components/ItemList/ItemsList";
import { itemService } from "../services/item.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { useLocation, useSearchParams } from "react-router-dom";
import { theme } from "../store/theme.store";
import { useEntity } from "simpler-state";
import { getFavorites } from "../store/favorite.store";
import ItemFilter from "../components/ItemFilter/ItemFilter";

function ItemIndex() {

    const [items, setItems] = useState(null)
    const location = useLocation()
    const itemType = location.pathname.substring(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(itemService.getFilterFromQueryString(searchParams))
    useEffectUpdate(loadItems, [itemType, filterBy], { itemType })
    const currTheme = useEntity(theme)

    async function loadItems({ itemType }) {
        try {
            let _items
            if (itemType === 'favorite') _items = getFavorites() || []
            else {
                _items = await itemService.getItems(itemType, filterBy)
                if (!_items) await itemService.makeData()
                _items = await itemService.getItems(itemType, filterBy)
            }
            setItems(_items)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        } setSearchParams(filterBy)
    }
    function onSetFilter(filterBy) {
        console.log("filterBy:", filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))

    }
    if (!items) return (<Loading />)
console.log('!')
    return (
        <section className={`app flex flex-column ${currTheme}`} >
            <ItemFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ItemsList items={items} />
        </section>
    )
}

export default ItemIndex