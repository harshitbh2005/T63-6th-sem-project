import React, { useState, useEffect } from 'react';
import {
  Star, Bell, TrendingUp, TrendingDown,
  Brain, Zap, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Watchlist() {

  const [alerts, setAlerts] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  const toggleAlert = (id) => {
    setAlerts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 🔥 BUY FUNCTION
  const handleBuy = (item) => {
    const quantity = prompt("Enter quantity to buy:");

    if (!quantity || isNaN(quantity)) return;

    const data = {
      symbol: item.symbol,
      quantity: parseFloat(quantity),
      buyPrice: parseFloat(item.price.replace("$", ""))
    };

    fetch("http://localhost:8080/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        alert("Added to portfolio!");
      })
      .catch(err => console.error(err));
  };

  // FETCH WATCHLIST
  useEffect(() => {
    fetch("http://localhost:8080/api/watchlist")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          price: `$${item.price}`
        }));

        setWatchlist(formatted);

        const initialAlerts = {};
        data.forEach(item => {
          initialAlerts[item.id] = false;
        });
        setAlerts(initialAlerts);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="main-content">

      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>AI Asset Monitor</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Real-time monitoring with portfolio integration
          </p>
        </div>
        <div className="ai-status-pulse">
          <Brain size={14} color="var(--accent-blue)" />
          <span style={{ fontSize: '11px', color: 'var(--accent-blue)' }}>
            LIVE DATA ACTIVE
          </span>
        </div>
      </div>

      <div className="content-row-full" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>

        {watchlist.map((item, index) => {

          const randomTrend = Math.random() > 0.5;

          return (
            <motion.div
              key={item.id}
              className="glass-panel ai-card hover-glow"
              style={{ padding: '20px' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: '700' }}>{item.symbol}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {item.name}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => toggleAlert(item.id)}>
                    <Bell size={16} />
                  </button>
                  <button>
                    <Star size={16} />
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '700' }}>
                  {item.price}
                </div>

                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  {randomTrend ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span style={{ fontSize: '12px' }}>
                    {randomTrend ? "Bullish" : "Bearish"}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button>Analyze</button>
                <button>Setup Alert</button>

                {/* 🔥 BUY BUTTON */}
                <button
                  onClick={() => handleBuy(item)}
                  style={{
                    background: 'var(--accent-green)',
                    color: 'white',
                    padding: '6px 10px',
                    borderRadius: '6px'
                  }}
                >
                  Buy
                </button>
              </div>

            </motion.div>
          );
        })}

        <motion.div className="glass-panel ai-card">
          <div style={{ textAlign: 'center' }}>
            <Activity size={24} />
            <div>Monitor New Asset</div>
          </div>
        </motion.div>

      </div>

    </div>
  );
}