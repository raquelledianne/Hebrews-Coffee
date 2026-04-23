import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  function placeOrder() {
    setLoading(true);

    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 2000);
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>

      <p style={{ fontStyle: "italic", marginBottom: "30px" }}>
        “More than coffee - it’s community”
      </p>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <div className="card" style={{ padding: "20px" }}>
          <p>Your cart is empty ☕</p>
          <Link className="btn" to="/menu">
            Go to Menu
          </Link>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div style={{ display: "grid", gap: "12px" }}>
            {cart.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    Qty: {item.quantity || 1}
                  </div>
                </div>

                <div>
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div
            className="card"
            style={{
              marginTop: "20px",
              padding: "16px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Total: ${total.toFixed(2)}
          </div>

          {/* LOADING */}
          {loading && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <div className="spinner"></div>
              <p>Preparing your order...</p>
            </div>
          )}

          {/* ACTIONS */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              className="btn"
              onClick={placeOrder}
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

            <Link
              to="/menu"
              className="btn"
              style={{ flex: 1, textAlign: "center" }}
            >
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
}