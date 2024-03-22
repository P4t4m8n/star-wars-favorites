import { Link } from "react-router-dom"

function PreviewFilm({ item }) {
    const { imgUrl, name, id, release_date } = item
    return (
        <>
            <div className='item-item-front'>
                <img src={imgUrl} alt={name} />
                <Link to={`/${id}`}>{name}</Link>
            </div>
            <div className='item-preview-back flex flex-column'>
                <h2>{name}</h2>
                <h3>{release_date || ''}</h3>
                <h4>{id || ''}</h4>
            </div>
        </>
    )
}

export default PreviewFilm