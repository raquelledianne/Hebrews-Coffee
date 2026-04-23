import { useState } from "react";

const drinks = [
  {
    name: "Daily Bread Latte",
    desc: "Classic latte with warm vanilla sweetness",
    price: 4.75,
    img: "/dailyBread.jpg",
  },
  {
    name: "The Promise Blend",
    desc: "Cherry-chocolate dark roast seasonal blend",
    price: 5.25,
    img: "/promise.png",
  },
  {
    name: "Milk and Honey Latte",
    desc: "Espresso, steamed milk, honey, vanilla",
    price: 4.95,
    img: "/milkHoney.png",
  },
  {
    name: "Armor of God Mocha",
    desc: "Bold dark chocolate mocha with espresso kick",
    price: 5.5,
    img: "/armor.jpg",
  },
];

export default function FeaturedDrinks() {
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
          size: "Regular",
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updated));

    // 🔥 trigger navbar update + bounce
    window.dispatchEvent(new Event("cartUpdated"));

    setToast(`${item.name} added ☕`);
    setTimeout(() => setToast(""), 1200);
  }

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontFamily: "Playfair Display",
            fontSize: "1.8rem",
            color: "#3b2a22",
            marginBottom: "6px",
          }}
        >
          Featured Drinks
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#c8a96a",
              borderRadius: "10px",
            }}
          />
          <span style={{ fontSize: "0.85rem", color: "#6b4f3b" }}>
            handcrafted favorites from Hebrews Coffee
          </span>
        </div>
      </div>

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
          }}
        >
          {toast}
        </div>
      )}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px",
        }}
      >
        {drinks.map((d, i) => (
          <div key={i} className="card">
            <div
              style={{
                height: "170px",
                backgroundImage: `url(${d.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div style={{ padding: "14px" }}>
              <strong>{d.name}</strong>
              <p style={{ fontSize: "0.9rem" }}>{d.desc}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>${d.price.toFixed(2)}</strong>

                <button className="btn" onClick={() => addToCart(d)}>
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}