import { useRef, useState } from "react";

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
  {
    section: "The Parables (Specialty Creations)",
    items: [
      { name: "Proverbs Pour-Over", desc: "Butterscotch oatmilk latte", price: 5.0 },
      { name: "The Promise Blend", desc: "Cherry-chocolate seasonal roast", price: 5.25, tag: "Seasonal" },
      { name: "Good News Latte", desc: "Cookie butter + cinnamon latte", price: 5.5 },
    ],
  },
  {
    section: "The Psalms (Comfort Drinks)",
    items: [
      { name: "Burning Bush Chai", desc: "Spiced chai latte with warmth", price: 4.75 },
      { name: "The Shepherd's Blend", desc: "Smooth low-acidity coffee", price: 3.75 },
      { name: "Genesis Glow", desc: "Light roast citrus notes", price: 3.95 },
      { name: "Saved and Caffeinated", desc: "Iced coffee with cream + syrup", price: 4.25, tag: "Iced" },
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

    // trigger navbar update
    window.dispatchEvent(new Event("cartUpdated"));

    setToast(`${item.name} added to cart ☕`);

    setTimeout(() => setToast(""), 1400);
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: "10px" }}>The Menu</h1>

      <p style={{ fontStyle: "italic", marginBottom: "40px" }}>
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

      {/* SECTIONS */}
      {menuData.map((section, idx) => (
        <MenuSection key={idx} title={section.section}>
          {section.items.map((item, i) => (
            <Item key={i} item={item} onAdd={addToCart} />
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
        borderRadius: "16px",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>{title}</h2>
      <div style={{ display: "grid", gap: "12px" }}>{children}</div>
    </div>
  );
}

/* ---------------- ITEM ---------------- */

function Item({ item, onAdd }) {
  const startX = useRef(0);
  const [swiping, setSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);

  const SWIPE_THRESHOLD = 80;

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
    setSwiping(true);
  }

  function handleTouchMove(e) {
    if (!swiping) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;

    if (diff > 0) {
      setSwipeX(diff);
    }
  }

  function handleTouchEnd() {
    setSwiping(false);

    if (swipeX > SWIPE_THRESHOLD) {
      onAdd(item);
    }

    setSwipeX(0);
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transform: `translateX(${swipeX}px)`,
        transition: swiping ? "none" : "transform 0.2s ease",
      }}
    >
      {/* SWIPE HINT BACKGROUND */}
      {swipeX > 10 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#8a9b7a",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "16px",
            color: "white",
            fontWeight: "bold",
            zIndex: 0,
          }}
        >
          ➕ Add to Cart
        </div>
      )}

      {/* LEFT SIDE */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
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
                whiteSpace: "nowrap",
              }}
            >
              {item.tag}
            </span>
          )}
        </div>

        <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          {item.desc}
        </span>

        <div style={{ marginTop: "6px", fontWeight: 600 }}>
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <button className="btn" onClick={() => onAdd(item)}>
          Order
        </button>
      </div>
    </div>
  );
}