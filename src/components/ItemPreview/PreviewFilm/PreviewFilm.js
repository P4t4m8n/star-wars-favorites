import { Link } from "react-router-dom"

function PreviewFilm({ item }) {
    const { imgUrl, name, id, release_date } = item

    function convertToLocalDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('he-IL')
    }

    const localDate = convertToLocalDate(release_date)
    return (
        <>
            <div className={`film-preview-front`}>
                <img src={imgUrl} alt={name} />
                <Link to={`${id}`}>{name}</Link>
            </div>
            <div className='film-preview-back flex flex-column'>
                <h2>{name}</h2>
                <h3>Release Date:{localDate}</h3>
                <h4>Episode Number: {id || ''}</h4>
            </div>
        </>
    )
}

export default PreviewFilm