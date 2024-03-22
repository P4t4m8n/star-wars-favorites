import { createContext, useState } from "react";
import Loading from "../components/Loading/Loading";
import ItemsList from "../components/ItemList/ItemsList";
import { itemService } from "../services/item.service";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export const BackgroundItemContext = createContext({
    selectedItemName: 'stars',
    updateBackgroundImg: () => { }
})

function ItemIndex() {

    const [items, setItems] = useState(null)
    const [backgroundImg, setBackgroundImg] = useState('stars')
    const location = useLocation()
    const itemType = location.pathname.substring(1)
    useEffectUpdate(loadItems, [], { itemType })
    const { theme } = useTheme()

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

    const updateBackgroundImg = (newName) => {
        setBackgroundImg(newName);
    }

    if (!items) return <Loading message="Loading Movies..." />

    return (
        <section className={`app flex flex-column ${theme}`} style={{ backgroundImage: `url('/imgs/${backgroundImg}.jpg')` }}>
            <BackgroundItemContext.Provider value={{ selectedItemName: backgroundImg, updateBackgroundImg }} >
                <Outlet />
            </BackgroundItemContext.Provider>
            <ItemsList items={items} />
        </section>
    )
}

export default ItemIndex