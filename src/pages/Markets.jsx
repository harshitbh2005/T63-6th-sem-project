import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Markets() {
  const [search, setSearch] = useState('');
  const [markets, setMarkets] = useState([]);

  // ✅ Fetch from Spring Boot backend
  useEffect(() => {
    fetch("http://localhost:8080/api/crypto")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((coin, index) => ({
          id: index,
          symbol: coin.symbol.toUpperCase() + "/USD",
          name: coin.name,
          price: coin.current_price,
          change: coin.price_change_percentage_24h?.toFixed(2) + "%",
          isPos: coin.price_change_percentage_24h >= 0,
          yield: (Math.random() * 10).toFixed(2) + "%",
          risk: "Medium"
        }));

        setMarkets(formatted);
      })
      .catch(err => console.error("Backend fetch error:", err));
  }, []);

  // 🔍 Search filter
  const filteredData = markets.filter(item =>
    item.symbol.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Header + LEFT search (only one) */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Market Page</h2>

        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: '10px',
            padding: '8px',
            width: '300px',
            borderRadius: '6px',
            border: '1px solid gray',
            background: 'transparent',
            color: 'white'
          }}
        />
      </div>

      {/* Table */}
      <div style={{ overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>

          <thead>
            <tr style={{ color: 'gray', fontSize: '12px' }}>
              <th>Asset</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>AI Yield</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <motion.tr key={item.id}>

                {/* Asset */}
                <td style={{ padding: '10px' }}>
                  <strong>{item.symbol}</strong>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{item.name}</div>
                </td>

                {/* Price */}
                <td>${item.price}</td>

                {/* Change */}
                <td style={{ color: item.isPos ? 'green' : 'red' }}>
                  {item.isPos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {item.change}
                </td>

                {/* Yield */}
                <td style={{ color: 'cyan' }}>
                  <Zap size={12} /> {item.yield}
                </td>

                {/* Risk */}
                <td style={{ color: 'orange' }}>
                  <Shield size={12} /> {item.risk}
                </td>

              </motion.tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}