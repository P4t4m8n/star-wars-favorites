import { useState } from "react";
import Loading from "../components/Loading/Loading";
import ItemsList from "../components/ItemList/ItemsList";
import { itemService } from "../services/item.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { useLocation } from "react-router-dom";
import { theme } from "../store/theme.store";
import { useEntity } from "simpler-state";

function ItemIndex() {

    const [items, setItems] = useState(null)
    const location = useLocation()
    const itemType = location.pathname.substring(1)
    useEffectUpdate(loadItems, [itemType], { itemType })
    const currTheme = useEntity(theme)

    async function loadItems({ itemType }) {
        try {
            let _items = await itemService.getItems(itemType)
            if (!_items) await itemService.makeData()
            _items = await itemService.getItems(itemType)
            setItems(_items)
        } catch (error) {
            console.error("Failed fetching movies:", error);
        }
    }
    console.log('t')

    if (!items) return <Loading message="Loading Movies..." />

    return (
        <section className={`app flex flex-column ${currTheme}`} >
            <ItemsList items={items} />
        </section>
    )
}

export default ItemIndex