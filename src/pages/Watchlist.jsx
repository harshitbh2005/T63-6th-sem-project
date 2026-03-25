import React, { useState, useEffect } from 'react';
import {
  Star, Bell, TrendingUp, TrendingDown,
  Brain, Zap, Activity
} from 'lucide-react';
import { mlEngine } from '../services/mlEngine';
import { motion } from 'framer-motion';

export default function Watchlist() {
  const [alerts, setAlerts] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  const toggleAlert = (id) => {
    setAlerts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ Fetch from backend
  const fetchWatchlist = () => {
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
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // ✅ DELETE FUNCTION
  const deleteCoin = (id) => {
    fetch(`http://localhost:8080/api/watchlist/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        // remove from UI instantly
        setWatchlist(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="main-content">
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>AI Asset Monitor</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Real-time sentiment & predictive volatility alerts
          </p>
        </div>
        <div className="ai-status-pulse">
          <Brain size={14} color="var(--accent-blue)" />
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-blue)' }}>
            Sentiment Analysis: ACTIVE
          </span>
        </div>
      </div>

      <div className="content-row-full" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {watchlist.map((item, index) => (
          <motion.div
            key={item.id}
            className="glass-panel ai-card hover-glow"
            style={{ padding: '20px', position: 'relative' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="sidebar-logo" style={{ width: 40, height: 40 }}>
                  {item.symbol.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700' }}>{item.symbol}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => toggleAlert(item.id)}>
                  <Bell size={18} />
                </button>
                <button>
                  <Star size={18} />
                </button>
              </div>
            </div>

            <div style={{ margin: '20px 0' }}>
              <div style={{ fontSize: '24px', fontWeight: '800' }}>{item.price}</div>

              {(() => {
                const pred = mlEngine.predictMarket(item.symbol);
                const isUp = pred.trend === 'BULLISH';
                return (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>
                      {pred.predictedMove}% AI Forecast
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* ✅ DELETE BUTTON */}
            <button
              onClick={() => deleteCoin(item.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'red',
                fontSize: '12px'
              }}
            >
              Delete
            </button>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px' }}>
              <div style={{ fontSize: '9px', marginBottom: '8px' }}>
                <Zap size={10} /> Sentiment Analysis
              </div>

              {(() => {
                const pred = mlEngine.predictMarket(item.symbol);
                return (
                  <div>
                    <div>{pred.trend}</div>
                    <div>{pred.confidence}%</div>
                  </div>
                );
              })()}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button>Analyze</button>
              <button>Setup Alert</button>
            </div>
          </motion.div>
        ))}

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