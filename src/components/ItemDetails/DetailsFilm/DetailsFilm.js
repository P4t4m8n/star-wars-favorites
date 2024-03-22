import { useEffect, useRef } from "react";

function DetailsFilm({ item }) {
    const elRef = useRef()

    useEffect(() => {
        startAnimation()
        console.log('1')
    }, [])

    function startAnimation() {
        const element = elRef.current;
        if (!element) return
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = '';
    }

    const { imgUrl, name, opening_crawl } = item

    return (
        <>
            <div className='movie-details-front'>
                <img src={imgUrl} alt=''></img>
                <div className='movie-info'>
                    <h2>{name}</h2>
                </div>
                <div className='opening_crawl'>
                    <p ref={elRef} className='scroll-text'>
                        {opening_crawl || ''}
                    </p>
                </div>
            </div>
            <div className='movie-details-front'>
            </div>
        </>
    )
}

export default DetailsFilm