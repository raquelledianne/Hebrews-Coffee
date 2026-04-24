import { useState } from "react";
import DrinkModal from "../components/DrinkModal";

export default function Menu() {
  const [toast, setToast] = useState("");
  const [selectedDrink, setSelectedDrink] = useState(null);

  function openCustomizer(item) {
    setSelectedDrink({
      name: item.name,
      prices: item.prices,
      price: item.prices.medium, // default price baseline
    });
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: "10px" }}>The Menu</h1>

      <p style={{ fontStyle: "italic", marginBottom: "50px" }}>
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
          }}
        >
          {toast}
        </div>
      )}

      {/* SECTIONS */}

      <MenuSection title="The Gospels (Signature Drinks)">
        <Item name="Hebrews Brew" desc="Smooth house-crafted drip coffee" prices={{ small: 3.5, medium: 4, large: 4.5 }} onCustomize={openCustomizer} />
        <Item name="Daily Bread Latte" desc="Vanilla-sweet classic latte" tag="Warm" prices={{ small: 4.25, medium: 4.75, large: 5.25 }} onCustomize={openCustomizer} />
        <Item name="Living Water Cold Brew" desc="Bold, slow-steeped refreshment" tag="Iced" prices={{ small: 4, medium: 4.5, large: 5 }} onCustomize={openCustomizer} />
        <Item name="Milk and Honey Latte" desc="Espresso, milk, honey, vanilla" prices={{ small: 4.5, medium: 4.95, large: 5.5 }} onCustomize={openCustomizer} />
        <Item name="Holy Grounds" desc="Balanced medium roast coffee" prices={{ small: 3.5, medium: 4, large: 4.5 }} onCustomize={openCustomizer} />
      </MenuSection>

      <MenuSection title="The Epistles (Espresso Bar)">
        <Item name="Exodus Espresso" desc="Single or double shot espresso" prices={{ small: 2.5, medium: 3, large: 3.5 }} onCustomize={openCustomizer} />
        <Item name="Manna Macchiato" desc="Caramel or honey drizzle espresso" prices={{ small: 4, medium: 4.5, large: 5 }} onCustomize={openCustomizer} />
        <Item name="Armor of God Mocha" desc="Bold dark chocolate mocha" tag="Bold" prices={{ small: 4.75, medium: 5.5, large: 6 }} onCustomize={openCustomizer} />
        <Item name="Grace and Grounds" desc="Sweet cream cold brew" tag="Iced" prices={{ small: 4.25, medium: 4.75, large: 5.25 }} onCustomize={openCustomizer} />
        <Item name="The Elijah Energy" desc="Extra-shot latte for strength" tag="Strong" prices={{ small: 4.75, medium: 5.25, large: 5.75 }} onCustomize={openCustomizer} />
      </MenuSection>

      <MenuSection title="The Parables (Specialty Creations)">
        <Item name="Proverbs Pour-Over" desc="Butterscotch oatmilk latte" prices={{ small: 4.5, medium: 5, large: 5.5 }} onCustomize={openCustomizer} />
        <Item name="The Promise Blend" desc="Cherry-chocolate seasonal roast" tag="Seasonal" prices={{ small: 4.75, medium: 5.25, large: 5.75 }} onCustomize={openCustomizer} />
        <Item name="Good News Latte" desc="Cookie butter + cinnamon latte" prices={{ small: 4.75, medium: 5.25, large: 5.75 }} onCustomize={openCustomizer} />
      </MenuSection>

      <MenuSection title="The Psalms (Comfort Drinks)">
        <Item name="Burning Bush Chai" desc="Spiced chai latte with warmth" prices={{ small: 4.25, medium: 4.75, large: 5.25 }} onCustomize={openCustomizer} />
        <Item name="The Shepherd's Blend" desc="Smooth low-acidity coffee" prices={{ small: 3.5, medium: 4, large: 4.5 }} onCustomize={openCustomizer} />
        <Item name="Genesis Glow" desc="Light roast citrus notes" prices={{ small: 3.75, medium: 4.25, large: 4.75 }} onCustomize={openCustomizer} />
        <Item name="Saved and Caffeinated" desc="Iced coffee with cream + syrup" tag="Iced" prices={{ small: 4, medium: 4.5, large: 5 }} onCustomize={openCustomizer} />
      </MenuSection>

      {/* ✅ UNIFIED DRINK MODAL */}
      {selectedDrink && (
        <DrinkModal
          drink={selectedDrink}
          onClose={() => setSelectedDrink(null)}
          onAdd={(msg) => showToast(msg)}
        />
      )}
    </div>
  );
}

/* SECTION */
function MenuSection({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "50px",
        padding: "24px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>
      <div style={{ display: "grid", gap: "12px" }}>{children}</div>
    </div>
  );
}

/* ITEM */
function Item({ name, desc, tag, prices, onCustomize }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "#f9f6f2",
      }}
    >
      <div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <strong>{name}</strong>

          {tag && (
            <span
              style={{
                fontSize: "0.7rem",
                padding: "4px 8px",
                borderRadius: "999px",
                background: "#8a9b7a",
                color: "white",
              }}
            >
              {tag}
            </span>
          )}
        </div>

        <div style={{ fontSize: "0.9rem", color: "#666" }}>{desc}</div>
      </div>

      <button className="btn" onClick={() => onCustomize({ name, prices })}>
        Customize
      </button>
    </div>
  );
}