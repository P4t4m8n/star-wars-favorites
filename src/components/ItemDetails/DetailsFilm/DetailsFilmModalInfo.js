

function DetailsModalInfo({ item }) {
    function convertToLocalDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('he-IL')
    }

    const { name, imgUrl, episodeNumber, release_date } = item
    const localDate = convertToLocalDate(release_date)
    return (
        <div className='item-info flex'>
            <img className="modal-img" src={imgUrl} alt={name}></img>
            <div className="modal-info flex flex-column">
                <h2>Title: {name}</h2>
                <h3>Episode Number: {episodeNumber}</h3>
                <h3>Release date{localDate}</h3>

            </div>
        </div>
    )
}

export default DetailsModalInfo