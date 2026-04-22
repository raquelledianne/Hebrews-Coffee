import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  // updates cart badge count
  useEffect(() => {
  const update = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    setCount(total);
  };

  update();

  // listen to BOTH events
  window.addEventListener("storage", update);
  window.addEventListener("cartUpdated", update);

  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("cartUpdated", update);
  };
}, []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          background: "var(--bg)",
          padding: "14px 16px",
          borderBottom: "1px solid var(--border)",
          zIndex: 1000,
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

          {/* NAV LINKS */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.95rem",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {/* CART BUTTON */}
            <button className="btn" onClick={() => setOpen(true)}>
              Cart ({count})
            </button>
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}