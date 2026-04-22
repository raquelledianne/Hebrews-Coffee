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

    setToast(`${item.name} added to cart ☕`);

    setTimeout(() => setToast(""), 1500);
  }

  return (
    <div>
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

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px",
        }}
      >
        {drinks.map((d, i) => (
          <div key={i} className="card" style={{ overflow: "hidden" }}>
            {/* IMAGE */}
            <div
              style={{
                height: "170px",
                backgroundImage: `url(${d.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              />

              <h3
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "12px",
                  color: "white",
                  margin: 0,
                }}
              >
                {d.name}
              </h3>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "14px" }}>
              <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
                {d.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>${d.price.toFixed(2)}</strong>

                <button
                  className="btn"
                  onClick={() => addToCart(d)}
                >
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