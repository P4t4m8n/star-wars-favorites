

function DetailsSpecieModalInfo({ item }) {
    const { name, imgUrl, skin_colors, language, classification } = item
    return (
        <div className='item-info flex'>
            <img src={imgUrl} alt={name}></img>
            <div className="modal-info flex flex-column">
                <h2>Name: {name}</h2>
                <h3>Skin Colors: {skin_colors}</h3>
                <h3>Language: {language}</h3>
                <h3>Class: {classification}</h3>
            </div>
        </div>
    )
}

export default DetailsSpecieModalInfo