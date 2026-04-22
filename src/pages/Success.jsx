import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

export default function Success() {
  const [orderId, setOrderId] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setOrderId("HB-" + Math.floor(1000 + Math.random() * 9000));

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container section" style={{ textAlign: "center" }}>
      {showConfetti && <Confetti numberOfPieces={150} />}

      <h1>🎉 Order Confirmed!</h1>

      <p style={{ fontStyle: "italic", marginTop: "10px" }}>
        “Your order is being prepared with care”
      </p>

      <div
        className="card"
        style={{
          marginTop: "30px",
          padding: "20px",
          display: "inline-block",
        }}
      >
        <h2>Order #{orderId}</h2>
        <p>You’ll receive your coffee soon ☕</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}