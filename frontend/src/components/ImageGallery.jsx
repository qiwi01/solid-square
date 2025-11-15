import React, { useState } from 'react';
// import '../styles/ImageGallery.css';
const ImageGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div style={{ position: 'relative' }}>
      <img src={images[current]} alt="Gallery" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      <button onClick={prev} style={{ position: 'absolute', left: 10, top: '50%' }}>Prev</button>
      <button onClick={next} style={{ position: 'absolute', right: 10, top: '50%' }}>Next</button>
    </div>
  );
};

export default ImageGallery;