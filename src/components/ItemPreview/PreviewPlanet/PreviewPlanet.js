import { Link } from "react-router-dom"

function PreviewPlanet({ item }) {
    const { imgUrl, name, id, climate, terrain } = item
    return <>
        <div className={`character-preview-front`}>
            <img src={imgUrl} alt={name} />
            <Link to={`/planet/${id}`}>{name}</Link>
        </div>
        <div className='character-preview-back flex flex-column'>
            <h2>{name}</h2>
            <h3 title="climate">Climate: {climate}</h3>
            <h3 title="terrain">Terrain: {terrain}</h3>
        </div>
    </>
}

export default PreviewPlanet