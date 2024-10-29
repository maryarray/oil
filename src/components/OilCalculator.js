import React, { useState, useEffect } from "react";

const OilCalculator = () => {
  const [results, setResults] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(29.9); // Default value
  let minAmount = 0.3
  let maxAmount = 1.0
  useEffect(() => {
    const oilCal = () => {
      let cummulateDiff = 0.01;
      let cummulateAmount = minAmount;
      let curMaxDiff = 0;
      const localResults = [];

      while (cummulateAmount < maxAmount) {
        cummulateAmount =
          Math.round((cummulateAmount + cummulateDiff) * 100) / 100;
        let realPrice = cummulateAmount * currentPrice;
        let payPrice = Math.round(realPrice);
        let maxDiff = 0;

        if (realPrice - payPrice > 0) {
          if (curMaxDiff < realPrice - payPrice) {
            localResults.push({
              condition: curMaxDiff < realPrice - payPrice,
              curMaxDiff: `${curMaxDiff} = ${realPrice} - ${payPrice}`,
              amount: `Amount: ${cummulateAmount} ${realPrice} - ${payPrice} = ${
                realPrice - payPrice
              }`,
            });
            curMaxDiff = realPrice - payPrice;
          }
        }
      }
      return localResults;
    };

    const results = oilCal();
    
    setResults(results);
  }, [currentPrice]);
  const handleCalculate = () => {
    setResults(results);
  };
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h2>Oil Calculation Results</h2>
      <div>
      <label>
          Current Price: ${currentPrice.toFixed(2)}
        </label>
      <input
          type="range"
          min="20"
          max="35" // Adjust the max value as needed
          step="0.1"
          value={currentPrice}
          style={{ width: '300px', display: 'block' }}
          onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
        />
      </div>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.condition ? (
              <>
                <p>{result.curMaxDiff}</p>
                <p>{result.amount}</p>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OilCalculator;
