import { useEffect, useState } from "react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
    fetchRecommendations();
  }, []);

  // 🔥 FETCH PORTFOLIO
  const fetchPortfolio = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/portfolio");
      const data = await res.json();

      console.log("PORTFOLIO:", data);
      setPortfolio(data);
    } catch (err) {
      console.error("Portfolio fetch failed", err);
    }
  };

  // 🔥 FETCH ML RECOMMENDATIONS
  const fetchRecommendations = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/recommendations");

      if (!res.ok) throw new Error("ML failed");

      const data = await res.json();

      console.log("RECOMMENDATIONS:", data);
      setRecommendations(data);
    } catch (err) {
      setRecommendations([
        {
          coin: "ERROR",
          action: "HOLD",
          reason: "ML service not responding",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SELL FUNCTION
  const handleSell = async (id) => {
    const confirmSell = window.confirm("Are you sure you want to sell this asset?");
    if (!confirmSell) return;

    try {
      await fetch(`http://localhost:8080/api/portfolio/${id}`, {
        method: "DELETE",
      });

      // update UI instantly
      setPortfolio((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Sell failed", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h1>Your Portfolio</h1>

      {/* 🔥 AI RECOMMENDATIONS (TOP GRID) */}
      <h2 style={{ marginTop: "20px" }}>AI Recommendations</h2>

      {loading && <p>Loading recommendations...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "15px",
        }}
      >
        {!loading &&
          recommendations.map((rec, i) => (
            <div
              key={i}
              style={{
                padding: "12px",
                border: "1px solid #2a3b5f",
                borderRadius: "10px",
                background: "#0f172a",
              }}
            >
              <h4 style={{ margin: 0 }}>{rec.coin}</h4>

              <p style={{ margin: "5px 0" }}>
                <b
                  style={{
                    color:
                      rec.action.includes("BUY")
                        ? "green"
                        : rec.action.includes("SELL")
                        ? "red"
                        : "orange",
                  }}
                >
                  {rec.action}
                </b>
              </p>

              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {rec.reason}
              </p>
            </div>
          ))}
      </div>

      {/* 🔥 PORTFOLIO SECTION */}
      <h2 style={{ marginTop: "40px" }}>Your Assets</h2>

      {portfolio.length === 0 ? (
        <p>No assets added</p>
      ) : (
        portfolio.map((item, i) => (
          <div
            key={i}
            style={{
              marginTop: "10px",
              padding: "15px",
              border: "1px solid #2a3b5f",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#0f172a",
            }}
          >
            <div>
              <h3>{item.symbol}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Buy Price: ${item.buyPrice}</p>
            </div>

            {/* 🔥 SELL BUTTON */}
            <button
              onClick={() => handleSell(item.id)}
              style={{
                background: "#ef4444",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sell
            </button>
          </div>
        ))
      )}
    </div>
  );
}