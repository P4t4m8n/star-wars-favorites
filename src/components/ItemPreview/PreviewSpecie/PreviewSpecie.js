import { Link } from "react-router-dom"


function PreviewSpecie({ item }) {
    console.log("item:", item)

    const { imgUrl, name, id, classification, language } = item

    return <>
        <div className={`character-preview-front`}>
            <img src={imgUrl} alt={name} />
            <Link to={`${id}`}>{name}</Link>
        </div>
        <div className='character-preview-back flex flex-column'>
            <h2>{name}</h2>
            <h3 title="classification">CLass: {classification}</h3>
            <h3 title="language">Lang: {language}</h3>
        </div>
    </>
}

export default PreviewSpecie