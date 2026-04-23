import { useState, useRef } from "react";

/* ---------------- MENU DATA ---------------- */

const menuData = [
  {
    section: "The Gospels (Signature Drinks)",
    items: [
      { name: "Hebrews Brew", desc: "Smooth house-crafted drip coffee", price: 3.95 },
      { name: "Daily Bread Latte", desc: "Vanilla-sweet classic latte", price: 4.75, tag: "Warm" },
      { name: "Living Water Cold Brew", desc: "Bold, slow-steeped refreshment", price: 4.5, tag: "Iced" },
      { name: "Milk and Honey Latte", desc: "Espresso, milk, honey, vanilla", price: 4.95 },
      { name: "Holy Grounds", desc: "Balanced medium roast coffee", price: 3.5 },
    ],
  },
  {
    section: "The Epistles (Espresso Bar)",
    items: [
      { name: "Exodus Espresso", desc: "Single or double shot espresso", price: 2.75 },
      { name: "Manna Macchiato", desc: "Caramel or honey drizzle espresso", price: 3.95 },
      { name: "Armor of God Mocha", desc: "Bold dark chocolate mocha", price: 5.5, tag: "Bold" },
      { name: "Grace and Grounds", desc: "Sweet cream cold brew", price: 4.25, tag: "Iced" },
      { name: "The Elijah Energy", desc: "Extra-shot latte for strength", price: 5.25, tag: "Strong" },
    ],
  },
];

/* ---------------- PAGE ---------------- */

export default function Menu() {
  const [toast, setToast] = useState("");

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((i) => i.name === item.name);

    let updated;

    if (existing) {
      updated = cart.map((i) =>
        i.name === item.name
          ? { ...i, quantity: (i.quantity || 1) + 1 }
          : i
      );
    } else {
      updated = [
        ...cart,
        {
          name: item.name,
          price: item.price,
          quantity: 1,
          size: "Regular",
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updated));

    // notify navbar instantly
    window.dispatchEvent(new Event("cartUpdated"));

    setToast(`${item.name} added ☕`);

    setTimeout(() => setToast(""), 1200);
  }

  return (
    <div className="container section">
      <h1>The Menu</h1>

      <p style={{ fontStyle: "italic", marginBottom: "30px" }}>
        “More than coffee - it’s community”
      </p>

      {/* TOAST */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#3b2a22",
            color: "white",
            padding: "10px 16px",
            borderRadius: "12px",
            zIndex: 9999,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          {toast}
        </div>
      )}

      {menuData.map((section, i) => (
        <MenuSection key={i} title={section.section}>
          {section.items.map((item, j) => (
            <SwipeItem key={j} item={item} onAdd={addToCart} />
          ))}
        </MenuSection>
      ))}
    </div>
  );
}

/* ---------------- SECTION ---------------- */

function MenuSection({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "40px",
        padding: "24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
      }}
    >
      <h2 style={{ marginBottom: "14px" }}>{title}</h2>
      <div style={{ display: "grid", gap: "12px" }}>{children}</div>
    </div>
  );
}

/* ---------------- SWIPE ITEM (UPGRADED) ---------------- */

function SwipeItem({ item, onAdd }) {
  const startX = useRef(0);
  const [swipeX, setSwipeX] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const THRESHOLD = 80;
  const MAX = 140;

  function handleStart(e) {
    startX.current = e.touches[0].clientX;
    setSwiping(true);
  }

  function handleMove(e) {
    if (!swiping) return;

    const diff = e.touches[0].clientX - startX.current;

    if (diff > 0) {
      setSwipeX(Math.min(diff, MAX));
    }
  }

  function handleEnd() {
    setSwiping(false);

    if (swipeX > THRESHOLD) {
      onAdd(item);
    }

    setSwipeX(0);
  }

  const progress = Math.min(swipeX / THRESHOLD, 1);

  return (
    <div
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        overflow: "hidden",

        transform: `translateX(${swipeX}px)`,
        transition: swiping ? "none" : "transform 0.25s ease",
      }}
    >
      {/* PROGRESS BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#8a9b7a",
          opacity: progress * 0.9,
          zIndex: 0,
        }}
      />

      {/* LEFT CONTENT */}
      <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <strong>{item.name}</strong>

          {item.tag && (
            <span
              style={{
                fontSize: "0.7rem",
                padding: "3px 8px",
                borderRadius: "999px",
                background: "#8a9b7a",
                color: "white",
              }}
            >
              {item.tag}
            </span>
          )}
        </div>

        <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          {item.desc}
        </div>

        <div style={{ marginTop: "6px", fontWeight: 600 }}>
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* RIGHT BUTTON */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <button className="btn" onClick={() => onAdd(item)}>
          Order
        </button>
      </div>
    </div>
  );
}