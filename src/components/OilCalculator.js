import React, { useState, useEffect } from "react";

const OilCalculator = () => {
  const [results, setResults] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(29.9); // Default value
  const [minAmount, setMinAmount] = useState(0.3); // Default value
  // const [maxAmount, setMaxAmount] = useState(7.0); // Default value
  let maxAmount = minAmount+2
  let selfHelpDiscount = 0.8 // NTD
  useEffect(() => {
    const oilCal = () => {
      let cummulateDiff = 0.01;
      let cummulateAmount = minAmount;
      let curMaxDiff = 0;
      const localResults = [];

      while (cummulateAmount < maxAmount) {
        cummulateAmount = Math.round((cummulateAmount + cummulateDiff) * 100) / 100;
        let realPrice
        if (cummulateAmount>1.0){
          realPrice = cummulateAmount * (currentPrice-selfHelpDiscount);
        }else{
          realPrice = cummulateAmount * currentPrice;

        }
        let payPrice = Math.round(realPrice);
        let maxDiff = 0;

        if (realPrice - payPrice > 0) {
          if (curMaxDiff < realPrice - payPrice) {
            localResults.push({
              condition: curMaxDiff < realPrice - payPrice,
              curMaxDiff: `${curMaxDiff} = ${realPrice} - ${payPrice}`,
              amount: `Amount: ${cummulateAmount} `,
              detail: `${realPrice} - ${payPrice} = ${realPrice - payPrice}`
            });
            curMaxDiff = realPrice - payPrice;
          }
        }
      }
      return localResults;
    };

    const results = oilCal();
    
    setResults(results);
  }, [currentPrice, minAmount]);
  const handleCalculate = () => {
    setResults(results);
  };
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h2>Oil Calculation Results</h2>
      <div style={{margin:"20px"}}>
      <label>
          Current Price: ${currentPrice.toFixed(2)}
        </label>
      <input
          type="range"
          min="20"
          max="35" // Adjust the max value as needed
          step="0.1"
          value={currentPrice}
          style={{ width: '300px', display: 'block'}}
          onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
        />
      </div>
      <div style={{margin:"20px"}}>
      <label>
          minAmount: {minAmount.toFixed(2)}L
        </label>
      <input
          type="range"
          min="0"
          max="30" // Adjust the max value as needed
          step="0.1"
          value={minAmount}
          style={{ width: '300px', display: 'block' }}
          onChange={(e) => setMinAmount(parseFloat(e.target.value))}
        />
      </div>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.condition ? (
              <>
                {/* <p>{result.curMaxDiff}</p> */}
                <p>{result.amount}</p>
                <p>{result.detail}</p>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OilCalculator;
