import React, { useState } from 'react';
import '../styles/MortgageCalculator.css';

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setResult(payment.toFixed(2));
  };

  return (
    <div className="calculator-card">
      <h3>Mortgage Calculator</h3>
      <input type="number" placeholder="Principal" onChange={e => setPrincipal(+e.target.value)} />
      <input type="number" placeholder="Annual Rate (%)" onChange={e => setRate(+e.target.value)} />
      <input type="number" placeholder="Months" onChange={e => setMonths(+e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <p>Monthly Payment: {result} NGN</p>}
    </div>
  );
};

export default MortgageCalculator;