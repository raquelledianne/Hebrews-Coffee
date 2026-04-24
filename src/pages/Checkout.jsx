import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const grouped = Object.values(
    cart.reduce((acc, item) => {
      const key = `${item.name}-${item.size || "Regular"}`;

      if (!acc[key]) {
        acc[key] = {
          ...item,
          size: item.size || "Regular",
          quantity: item.quantity || 1,
        };
      } else {
        acc[key].quantity += item.quantity || 1;
      }

      return acc;
    }, {})
  );

  const total = grouped.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
    }, 1800);
  }

  return (
    <div className="container section" style={{ maxWidth: "720px" }}>
      <h1>Checkout</h1>

      {grouped.length === 0 ? (
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          <p>Your cart is empty ☕</p>
          <Link className="btn" to="/menu">Browse Menu</Link>
        </div>
      ) : (
        <>
          {grouped.map((item, i) => (
            <div key={i} className="card" style={{ padding: 16 }}>
              <strong>{item.name}</strong>

              <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                Size: {item.size} × {item.quantity}
              </div>

              <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                Milk: {item.milk}
              </div>

              <div>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div className="card" style={{ padding: 18, marginTop: 20 }}>
            <h3>Total: ${total.toFixed(2)}</h3>

            <button className="btn" onClick={placeOrder} disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}