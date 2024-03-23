

function DetailsPlanetModalInfo({ item }) {
    const { name, imgUrl, population, terrain, climate } = item
    return (
        <div className='item-info flex'>
            <img className="modal-img" src={imgUrl} alt={name}></img>
            <div className="modal-info flex flex-column">
                <h2>Name: {name}</h2>
                <h3>Population: {population}</h3>
                <h3>Terrain: {terrain}</h3>
                <h3>Climate: {climate}</h3>
            </div>
        </div>
    )
}

export default DetailsPlanetModalInfo