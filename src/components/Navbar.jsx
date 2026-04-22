import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [bounce, setBounce] = useState(false);

  // 🔥 cart bounce trigger
  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 450);
  };

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const total = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      setCount(total);
      triggerBounce();
    };

    updateCart();

    // listen for updates inside same tab + other tabs
    window.addEventListener("storage", updateCart);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <>
      <nav
       style={{
  background: "var(--bg)",
  padding: "14px 16px",
  borderBottom: "1px solid var(--border)",
  transition: "all 0.3s ease",
}}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* BRAND */}
          <strong style={{ fontFamily: "Playfair Display" }}>
            Hebrews Coffee
          </strong>

          {/* LINKS + CART */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.95rem",
              alignItems: "center",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {/* CART BUTTON */}
            <button
              className={`btn ${bounce ? "cart-bounce" : ""}`}
              onClick={() => setOpen(true)}
              style={{
                position: "relative",
              }}
            >
              🛒 Cart ({count})
            </button>
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}