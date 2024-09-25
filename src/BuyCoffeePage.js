import React from 'react';
import './styles/BuyCoffee.css'; 
import Layout from './Layout';

const BuyCoffee = () => {
  return (
    <Layout>
    <div className="buy-coffee-container">
      <div className="coffee-icon">
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
    </Layout>
  );
};

export default BuyCoffee;
