import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
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
          <Link className="btn" to="/">
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div style={{ marginBottom: "20px" }}>
            {cart.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    Size: {item.size}
                  </div>
                </div>

                <div>${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <h2 style={{ marginBottom: "20px" }}>
            Total: ${total.toFixed(2)}
          </h2>

          {/* ACTIONS */}

          {loading && (
  <div style={{ marginBottom: "15px" }}>
    <div className="spinner"></div>
    <p style={{ color: "#666" }}>Preparing your order...</p>
  </div>
)}
         <button
  className="btn"
  onClick={() => {
    setLoading(true);

    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 2000);
  }}
  disabled={loading}
>
  {loading ? "Processing..." : "Place Order"}
</button>

          <Link
            to="/menu"
            style={{ marginLeft: "12px" }}
            className="btn"
          >
            Back to Menu
          </Link>
        </>
      )}
    </div>
  );
}