import React, { useState, useEffect } from 'react';
import {
  User, Mail, MapPin, Edit2,
  Award, TrendingUp, Shield, Brain, Zap, CheckCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const PERFORMANCE_DATA = [
  { month: 'Jan', pnl: 840 },
  { month: 'Feb', pnl: -420 },
  { month: 'Mar', pnl: 1150 },
  { month: 'Apr', pnl: 680 },
  { month: 'May', pnl: -150 },
  { month: 'Jun', pnl: 920 },
];

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/profile")
      .then(res => res.json())
      .then(data => setUserInfo(data));

    fetch("http://localhost:8080/api/portfolio/summary")
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  return (
    <div className="main-content">

      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Investor Profile</h2>
        <button className="ai-btn-primary" onClick={() => setIsEditing(!isEditing)}>
          <Edit2 size={14} /> Edit Profile
        </button>
      </div>

      <div className="content-row">

        {/* USER CARD */}
        <div style={{ flex: 1 }}>

          <motion.div className="glass-panel ai-card" style={{ padding: '24px' }}>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--bg-panel-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <User size={40} />
              </div>

              <div>

                <h3>{userInfo?.username || "User"}</h3>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Mail size={12} /> {userInfo?.email || "N/A"}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  <MapPin size={12} /> India
                </div>

                {summary && (
                  <div style={{ marginTop: '10px', fontSize: '12px' }}>
                    <div>Portfolio: ${summary.currentValue.toFixed(2)}</div>
                    <div style={{ color: summary.totalProfit >= 0 ? 'green' : 'red' }}>
                      Profit: ${summary.totalProfit.toFixed(2)}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </motion.div>

          {/* PERFORMANCE */}
          <motion.div className="glass-panel ai-card" style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '10px' }}>
              <TrendingUp size={14} /> Performance
            </div>

            <div style={{ height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pnl" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: '300px' }}>

          <motion.div className="glass-panel ai-card">
            <div>
              <Brain size={14} /> Trust Score
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2>
                {summary ? (80 + (summary.totalProfit > 0 ? 10 : 0)) : 80}%
              </h2>
              <div style={{ fontSize: '12px', color: 'green' }}>
                Stable System
              </div>
            </div>
          </motion.div>

          <motion.div className="glass-panel ai-card" style={{ marginTop: '16px' }}>
            <div><Award size={14} /> Achievements</div>

            <div style={{ marginTop: '10px' }}>
              <div>✔ First Investment</div>
              <div>✔ Portfolio Created</div>
              <div>✔ Active User</div>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
}