import React, { useEffect, useState } from "react";

export default function MarketData() {
  const [tickers, setTickers] = useState([
    { symbol: "NIFTY 50", type: "Index", price: 22450, change: 0.85 },
    { symbol: "Gold (24K)", type: "Commodity", price: 6350, change: 1.1 },
    { symbol: "Debt Fund NAV", type: "Mutual Fund", price: 52.4, change: 0.12 },
    { symbol: "Balanced Fund NAV", type: "Mutual Fund", price: 78.9, change: -0.2 },
  ]);

  // mock "live update" every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          const randomMove = (Math.random() - 0.5) * 0.4; // small change
          const newChange = +(item.change + randomMove).toFixed(2);

          return {
            ...item,
            change: newChange,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const priceHistory = [
    { day: "Day 1", value: "₹22,100" },
    { day: "Day 2", value: "₹22,250" },
    { day: "Day 3", value: "₹22,180" },
    { day: "Day 4", value: "₹22,320" },
    { day: "Day 5", value: "₹22,410" },
    { day: "Day 6", value: "₹22,390" },
    { day: "Day 7", value: "₹22,450" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Market Data & Pricing</h2>
      <p style={{ marginTop: "6px" }}>
        Live tickers for assets used in your Wealth Management & Goal Tracker.
      </p>

      {/* Live Market Tickers */}
      <h3 style={{ marginTop: "18px" }}>Live Market Tickers</h3>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Current Price</th>
            <th>Change (%)</th>
          </tr>
        </thead>

        <tbody>
          {tickers.map((t, index) => (
            <tr key={index}>
              <td>{t.symbol}</td>
              <td>{t.type}</td>
              <td>
                {t.symbol.includes("Gold") ? `₹${t.price} / gram` : `₹${t.price}`}
              </td>
              <td style={{ color: t.change >= 0 ? "green" : "red" }}>
                {t.change >= 0 ? `+${t.change}%` : `${t.change}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Price History */}
      <h3 style={{ marginTop: "24px" }}>Price History (Sample - 7 Days)</h3>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>Day</th>
            <th>NIFTY 50 Value</th>
          </tr>
        </thead>

        <tbody>
          {priceHistory.map((p, index) => (
            <tr key={index}>
              <td>{p.day}</td>
              <td>{p.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
