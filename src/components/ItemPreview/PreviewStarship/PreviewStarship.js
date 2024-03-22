import { Link } from "react-router-dom"

function PreviewStarship({ item }) {
    const { imgUrl, name, id, model, manufacturer } = item

    return <>
        <div className={`character-preview-front`}>
            <img src={imgUrl} alt={name} />
            <Link to={`${id}`}>{name}</Link>
        </div>
        <div className='character-preview-back flex flex-column'>
            <h2>{name}</h2>
            <h4>{model}</h4>
            <h4>{manufacturer}</h4>
        </div>
    </>
}

export default PreviewStarship