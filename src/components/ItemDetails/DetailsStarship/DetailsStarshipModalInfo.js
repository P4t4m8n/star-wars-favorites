function DetailsStarshipModalInfo({ item }) {
    const { name, imgUrl, manufacturer, model, starship_class } = item
    return (
        <div className='item-info flex'>
            <img className="modal-img" src={imgUrl} alt={name}></img>
            <div className="modal-info flex flex-column">
                <h2>Name: {name}</h2>
                <h3>Manufacturer: {manufacturer}</h3>
                <h3>model: {model}</h3>
                <h3>Class: {starship_class}</h3>
            </div>
        </div>
    )
}
export default DetailsStarshipModalInfo