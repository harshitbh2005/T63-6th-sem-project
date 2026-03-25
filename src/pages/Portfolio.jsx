import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown,
  Shield, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Portfolio() {

  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/portfolio")
      .then(res => res.json())
      .then(data => setPortfolio(data));

    fetch("http://localhost:8080/api/portfolio/summary")
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  return (
    <div className="main-content">

      {/* HEADER */}
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Portfolio</h2>
      </div>

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="content-row-full" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { label: 'Total Investment', val: `$${summary.totalInvestment.toFixed(2)}` },
            { label: 'Current Value', val: `$${summary.currentValue.toFixed(2)}` },
            { label: 'Total Profit', val: `$${summary.totalProfit.toFixed(2)}` },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-panel ai-card"
              style={{ padding: '16px' }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{stat.label}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '5px' }}>
                {stat.val}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* PORTFOLIO LIST */}
      <div className="content-row-full" style={{ marginTop: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {portfolio.map((item, index) => {
          const isProfit = item.profit >= 0;

          return (
            <motion.div
              key={index}
              className="glass-panel ai-card"
              style={{ padding: '20px' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>{item.symbol}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Qty: {item.quantity}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px' }}>
                    ${item.currentPrice.toFixed(2)}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)'
                  }}>
                    {isProfit ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    ${item.profit.toFixed(2)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                Buy Price: ${item.buyPrice}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}