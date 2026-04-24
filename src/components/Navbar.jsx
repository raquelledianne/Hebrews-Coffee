import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const total = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      setCount(total);

      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    };

    update();

    window.addEventListener("cartUpdated", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("cartUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          background: "#f6efe6",
          padding: "16px 20px",
          borderBottom: "1px solid #e7ddd3",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* BRAND */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Playfair Display",
                fontSize: "1.3rem",
                color: "#3b2a22",
              }}
            >
              Hebrews Coffee
            </span>

            <div
              style={{
                width: "45%",
                height: "2px",
                background: "#c8a96a",
                borderRadius: "10px",
                marginTop: "4px",
              }}
            />
          </div>

   {/* LINKS */}
<div className="nav-links" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  
  <Link to="/">Home</Link>
  <Link to="/menu">Menu</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>

  {/* CART */}
  <button
    onClick={() => setOpen(true)}
    style={{
      position: "relative",
      background: "#6b4f3b",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "999px",
      cursor: "pointer",
    }}
  >
    Cart

    {count > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-6px",
          right: "-8px",
          background: "#c8a96a",
          color: "#3b2a22",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          transform: animate ? "scale(1.4)" : "scale(1)",
          transition: "transform 0.25s ease",
        }}
      >
        {count}
      </span>
    )}
  </button>
</div>
          {/* HAMBURGER (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link to="/menu" onClick={() => setMobileMenu(false)}>Menu</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>

            <button
              onClick={() => {
                setOpen(true);
                setMobileMenu(false);
              }}
              style={{
                background: "#6b4f3b",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "999px",
              }}
            >
              Cart ({count})
            </button>
          </div>
        )}
      </nav>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}