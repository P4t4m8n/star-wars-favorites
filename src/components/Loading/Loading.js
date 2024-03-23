import React, { useEffect, useState } from 'react';

function Loading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const texts = [
    'Fetching data from the dark side',
    'They have cookies...',
    'No cookies, still fetching data',
    'They lied to us, going to the light side',
    'Still fetching']

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [texts.length])

  return (
    <div className="loading-container">
      <img src="https://res.cloudinary.com/dpnevk8db/image/upload/v1711152009/darth-vader_rjcghd.png" alt="Loading" className="spinning-image" />
      <div key={currentTextIndex} className="fade-text">
        {texts[currentTextIndex]}
      </div>
    </div>
  );
}

export default Loading;