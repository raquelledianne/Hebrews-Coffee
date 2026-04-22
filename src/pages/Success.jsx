import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

export default function Success() {
  const [orderId, setOrderId] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const id = "HB-" + Math.floor(1000 + Math.random() * 9000);
    setOrderId(id);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  return (
    <div
      className="container section"
      style={{ textAlign: "center", paddingTop: "100px" }}
    >
      {/* CONFETTI MUST BE INSIDE RETURN */}
      {showConfetti && (
        <Confetti numberOfPieces={150} gravity={0.2} />
      )}

      <h1>🎉 Order Confirmed!</h1>

      <p style={{ fontStyle: "italic", marginTop: "10px" }}>
        “Your order is being prepared with care”
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#fff",
          borderRadius: "16px",
          display: "inline-block",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Order #{orderId}</h2>
        <p style={{ color: "#666" }}>
          You’ll receive your coffee soon ☕
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}