import React, { useState, useEffect } from "react";

const MarketData = () => {
  const [tickers, setTickers] = useState([]);

  // Mock ticker data
  useEffect(() => {
    setTickers([
      { name: "Retirement Fund", price: 5000, change: +200 },
      { name: "Emergency Savings", price: 10000, change: +50 },
      { name: "Crypto Investment", price: 1200, change: -100 },
      { name: "Mutual Fund A", price: 4500, change: +75 },
    ]);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Live Market Tickers</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Current Price (USD)</th>
            <th>Change (USD)</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map((asset, index) => (
            <tr key={index}>
              <td>{asset.name}</td>
              <td>{asset.price}</td>
              <td style={{ color: asset.change >= 0 ? "green" : "red" }}>
                {asset.change >= 0 ? `+${asset.change}` : asset.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketData;
