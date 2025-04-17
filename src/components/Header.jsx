import React from "react";
import { Link } from "react-router-dom";
import coinLogo from '../assets/coin.svg';

export default function Header() {
  // Randomly choose heads or tails for the coin
  const isHeads = Math.random() < 0.5;
  return (
    <header>
      <span style={{ display: 'inline-block', transform: isHeads ? 'scaleX(1)' : 'scaleX(-1)' }}>
        <img src={coinLogo} alt="Coin Logo" style={{ height: '40px', verticalAlign: 'middle', marginRight: '10px' }} />
      </span>
      <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>Personality Quiz</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  );
}
