import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];

    const grouped = Object.values(
      saved.reduce((acc, item) => {
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

    setCart(grouped);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, [open]);

  // ➕ / ➖ quantity update
  const updateQty = (name, size, delta) => {
    const raw = JSON.parse(localStorage.getItem("cart")) || [];

    const updated = raw
      .map((item) => {
        if (item.name === name && (item.size || "Regular") === size) {
          return {
            ...item,
            quantity: (item.quantity || 1) + delta,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // auto remove if 0

    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ❌ remove item completely
  const removeItem = (name, size) => {
    const raw = JSON.parse(localStorage.getItem("cart")) || [];

    const updated = raw.filter(
      (item) =>
        !(item.name === name && (item.size || "Regular") === size)
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
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

      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-100%",
          width: "360px",
          height: "100vh",
          background: "#fff",
          zIndex: 2000,
          transition: "right 0.35s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Your Order</h2>
            <button className="btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* ITEMS */}
        <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              Your cart is empty ☕
            </p>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 12, marginBottom: 10 }}
              >
                <strong>{item.name}</strong>

                <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                  Size: {item.size}
                </div>

                <div style={{ marginTop: 4 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* CONTROLS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    className="btn"
                    onClick={() =>
                      updateQty(item.name, item.size, -1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn"
                    onClick={() =>
                      updateQty(item.name, item.size, 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.name, item.size)}
                  style={{
                    marginTop: "8px",
                    fontSize: "0.8rem",
                    background: "transparent",
                    border: "none",
                    color: "#a44",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: 16, borderTop: "1px solid #eee" }}>
          <h3>Total: ${total.toFixed(2)}</h3>

          <Link to="/checkout" className="btn" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}