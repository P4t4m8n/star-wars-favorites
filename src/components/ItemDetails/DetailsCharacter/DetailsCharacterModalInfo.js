

function DetailsCharacterModalInfo({ item }) {
    const { name, imgUrl, birth_year, eye_color, gender } = item
    return (
        <div className='item-info flex'>
            <img src={imgUrl} alt={name}></img>
            <div className="modal-info flex flex-column">
                <h2>Title: {name}</h2>
                <h3>Birth Year: {birth_year}</h3>
                <h3>Eye Color: {eye_color}</h3>
                <h3>Gender: {gender}</h3>

            </div>
        </div>
    )
}

export default DetailsCharacterModalInfo