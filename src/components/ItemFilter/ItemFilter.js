import { useCallback, useState, useEffect } from "react";
import { utilService } from "../../services/util.service";

function ItemFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    // Creating a debounced version of onSetFilter
    const debouncedOnSetFilter = useCallback(utilService.debounce((newFilter) => {
        onSetFilter(newFilter);
    }, 2000), []);

    useEffect(() => {
        // Call the debounced version of onSetFilter every time filterByToEdit changes
        debouncedOnSetFilter(filterByToEdit);
    }, [filterByToEdit, debouncedOnSetFilter]);

    function handleChange({ target }) {
        const { name, value } = target;

        // Update the local state with the new value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }));
    }

    const { name } = filterByToEdit;

    return (
        <section className="item-filter flex">
            <h2>Filter By name</h2>
            <input value={name} onChange={handleChange} type="text" name="name" />
        </section>
    );
}

export default ItemFilter;
