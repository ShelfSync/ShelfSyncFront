import React from 'react';
import './BuyCoffee.css'; // Stilleri ayrı bir dosyaya almak isterseniz

const BuyCoffee = () => {
  return (
    <div className="buy-coffee-container">
      <div className="coffee-icon">
        {/* Kahve ikonu için basit bir emoji veya bir SVG kullanılabilir */}
        <span role="img" aria-label="coffee">☕</span>
      </div>
      <h2 className="buy-coffee-title">Buy Us a Coffee!</h2>
      <p className="buy-coffee-description">
        If you enjoy our content and want to support us, buy us a coffee!
      </p>
      <button className="buy-coffee-button">
        <a href="https://www.buymeacoffee.com/yourpage" target="_blank" rel="noopener noreferrer">
          Buy Coffee
        </a>
      </button>
    </div>
  );
};

export default BuyCoffee;
