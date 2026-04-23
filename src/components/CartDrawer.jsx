import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved);
    };

    loadCart();

    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, [open]);

  // 🔥 notify navbar instantly
  const emitCartUpdate = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const updateQty = (name, delta) => {
    const updated = cart.map((item) =>
      item.name === name
        ? {
            ...item,
            quantity: Math.max(1, (item.quantity || 1) + delta),
          }
        : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    emitCartUpdate();
  };

  const removeItem = (name) => {
    const updated = cart.filter((item) => item.name !== name);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    emitCartUpdate();
  };

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1999,
          }}
        />
      )}

      {/* DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-100%",
          width: "360px",
          maxWidth: "100vw",
          height: "100vh",

          background: "#ffffff",
          color: "#3b2a22",

          borderLeft: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "-20px 0 50px rgba(0,0,0,0.25)",

          zIndex: 2000,
          display: "flex",
          flexDirection: "column",

          transition: "right 0.35s ease",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Your Order</h2>

            <button className="btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>
            Hebrews Coffee • pickup order
          </p>
        </div>

        {/* ITEMS */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px",
          }}
        >
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              Your cart is empty ☕
            </p>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                }}
              >
                <strong>{item.name}</strong>

                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                  ${item.price.toFixed(2)}
                </div>

                {/* qty */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    className="btn"
                    onClick={() => updateQty(item.name, -1)}
                  >
                    -
                  </button>

                  <span>{item.quantity || 1}</span>

                  <button
                    className="btn"
                    onClick={() => updateQty(item.name, 1)}
                  >
                    +
                  </button>
                </div>

                {/* remove */}
                <button
                  onClick={() => removeItem(item.name)}
                  style={{
                    marginTop: "10px",
                    background: "transparent",
                    border: "1px solid #c8a96a",
                    color: "#6b4f3b",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid #eee",
            padding: "16px",
            background: "#fff",
          }}
        >
          <h3>Total: ${total.toFixed(2)}</h3>

          <Link
            to="/Checkout"
            className="btn"
            style={{ width: "100%", display: "block", textAlign: "center" }}
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}