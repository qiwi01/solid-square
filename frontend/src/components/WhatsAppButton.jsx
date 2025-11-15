import React from 'react';
import '../styles/WhatsappButton.css';

const WhatsAppButton = () => (
  <a href="https://wa.me/+234123456789?text=Hello, I have a question about SolidSquare Estates" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '50px' }} />
  </a>
);

export default WhatsAppButton;