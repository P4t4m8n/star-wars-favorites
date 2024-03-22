import { Link } from "react-router-dom"

function PreviewCharacter({ item }) {
    const { imgUrl, name, id, birth_year } = item
    return <>
        <div className={`character-preview-front`}>
            <img src={imgUrl} alt={name} />
            <Link to={`${id}`}>{name}</Link>
        </div>
        <div className='character-preview-back flex flex-column'>
            <h2>{name}</h2>
            <h3>Birth Year:{birth_year}</h3>

        </div>
    </>
}

export default PreviewCharacter