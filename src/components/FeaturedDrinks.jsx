import { useState } from "react";
import DrinkModal from "./DrinkModal";

const drinks = [
  {
    name: "Daily Bread Latte",
    desc: "Classic latte with warm vanilla sweetness",
    img: "/dailyBread.jpg",
  },
  {
    name: "The Promise Blend",
    desc: "Cherry-chocolate dark roast seasonal blend",
    img: "/promise.png",
  },
  {
    name: "Milk and Honey Latte",
    desc: "Espresso, steamed milk, honey, vanilla",
    img: "/milkHoney.png",
  },
  {
    name: "Armor of God Mocha",
    desc: "Bold dark chocolate mocha with espresso kick",
    img: "/armor.jpg",
  },
];

export default function FeaturedDrinks() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
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

              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {d.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="btn"
                  onClick={() => setSelected(d)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unified modal (handles ALL pricing now) */}
      <DrinkModal
        drink={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}