export default function Menu() {
  return (
    <div className="container section">
      <h1 style={{ marginBottom: "10px" }}>The Menu</h1>

      <p style={{ fontStyle: "italic", marginBottom: "50px" }}>
        “More than coffee - it’s community”
      </p>

      <MenuSection title="The Gospels (Signature Drinks)">
        <Item name="Hebrews Brew" desc="Smooth house-crafted drip coffee" />
        <Item name="Daily Bread Latte" desc="Vanilla-sweet classic latte" tag="Warm" />
        <Item name="Living Water Cold Brew" desc="Bold, slow-steeped refreshment" tag="Iced" />
        <Item name="Milk and Honey Latte" desc="Espresso, milk, honey, vanilla" />
        <Item name="Holy Grounds" desc="Balanced medium roast coffee" />
      </MenuSection>

      <MenuSection title="The Epistles (Espresso Bar)">
        <Item name="Exodus Espresso" desc="Single or double shot espresso" />
        <Item name="Manna Macchiato" desc="Caramel or honey drizzle espresso" />
        <Item name="Armor of God Mocha" desc="Bold dark chocolate mocha" tag="Bold" />
        <Item name="Grace and Grounds" desc="Sweet cream cold brew" tag="Iced" />
        <Item name="The Elijah Energy" desc="Extra-shot latte for strength" tag="Strong" />
      </MenuSection>

      <MenuSection title="The Parables (Specialty Creations)">
        <Item name="Proverbs Pour-Over" desc="Butterscotch oatmilk latte" />
        <Item name="The Promise Blend" desc="Cherry-chocolate seasonal roast" tag="Seasonal" />
        <Item name="Good News Latte" desc="Cookie butter + cinnamon latte" />
      </MenuSection>

      <MenuSection title="The Psalms (Comfort Drinks)">
        <Item name="Burning Bush Chai" desc="Spiced chai latte with warmth" />
        <Item name="The Shepherd's Blend" desc="Smooth low-acidity coffee" />
        <Item name="Genesis Glow" desc="Light roast citrus notes" />
        <Item name="Saved and Caffeinated" desc="Iced coffee with cream + syrup" tag="Iced" />
      </MenuSection>
    </div>
  );
}

/* SECTION WRAPPER */
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
      <h2 style={{ marginBottom: "20px", fontSize: "1.4rem" }}>{title}</h2>
      <div style={{ display: "grid", gap: "12px" }}>{children}</div>
    </div>
  );
}

/* MENU ITEM */
function Item({ name, desc, tag }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "#f9f6f2",
      }}
    >
      <div>
        <strong style={{ display: "block" }}>{name}</strong>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>{desc}</span>
      </div>

      {tag && (
        <span
          style={{
            fontSize: "0.75rem",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "#8a9b7a",
            color: "white",
            height: "fit-content",
            alignSelf: "center",
          }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}