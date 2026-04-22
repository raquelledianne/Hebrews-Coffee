import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0),
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
      <h1>Order Receipt</h1>

      <p style={{ fontStyle: "italic", marginBottom: "30px" }}>
        “More than coffee - it’s community”
      </p>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link className="btn" to="/menu">
            Back to Menu
          </Link>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div style={{ marginBottom: "20px" }}>
            {cart.map((item, i) => (
              <div
                key={i}
                className="card"
                 style={{
    maxWidth: "600px",
    background: "var(--surface)",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    Size: {item.size || "Regular"}
                  </div>
                </div>

                <div>${(item.price || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <h2 style={{ marginBottom: "20px" }}>
            Total: ${total.toFixed(2)}
          </h2>

          {/* LOADING */}
          {loading && (
            <div style={{ marginBottom: "15px", textAlign: "center" }}>
              <div className="spinner"></div>
              <p>Preparing your order...</p>
            </div>
          )}

          {/* BUTTONS */}
          <button
            className="btn"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          <Link
            to="/menu"
            className="btn"
            style={{ marginLeft: "12px" }}
          >
            Back to Menu
          </Link>
        </>
      )}
    </div>
  );
}