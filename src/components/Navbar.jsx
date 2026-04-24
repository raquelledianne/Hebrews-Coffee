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

          {/* DESKTOP LINKS */}
          <div
            className="nav-links"
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
            }}
          >
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/menu" className="nav-link">Menu</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>

            <button
              onClick={() => setOpen(true)}
              className={animate ? "cart-btn cart-bounce" : "cart-btn"}
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
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        {mobileMenu && (
          <>
            {/* BACKDROP */}
            <div
              onClick={() => setMobileMenu(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 9998,
              }}
            />

            {/* DRAWER */}
            <div className="mobile-drawer">

              {/* STEAM LAYER */}
              <div className="drawer-steam">
                <span className="drawer-steam-blob s1" />
                <span className="drawer-steam-blob s2" />
                <span className="drawer-steam-blob s3" />
              </div>

              {/* CONTENT */}
              <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>

                {/* HEADER */}
                <div className="drawer-header">
                  <span>Menu</span>

                  <button
                    className="drawer-close"
                    onClick={() => setMobileMenu(false)}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* LINKS */}
                <div className="drawer-links">
                  <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                  <Link to="/menu" onClick={() => setMobileMenu(false)}>Menu</Link>
                  <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
                  <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
                </div>

                {/* CART */}
                <button
                  onClick={() => {
                    setOpen(true);
                    setMobileMenu(false);
                  }}
                  className="drawer-cart"
                >
                  View Cart ({count})
                </button>

              </div>
            </div>
          </>
        )}
      </nav>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}