import { useEffect, useState } from "react";

const SIZE_PRICES = {
  small: 4.0,
  medium: 5.25, // "Regular"
  large: 6.5,
};

export default function DrinkModal({ drink, onClose, onAdd }) {
  const [size, setSize] = useState("medium");
  const [milk, setMilk] = useState("Whole Milk");

  useEffect(() => {
    if (drink) {
      setSize("medium");
      setMilk("Whole Milk");
    }
  }, [drink]);

  if (!drink) return null;

  const price = SIZE_PRICES[size];

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      name: drink.name,
      size,
      milk,
      price,
      quantity: 1,
    };

    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));

    onAdd?.(`${drink.name} (${size}) added ☕`);
    onClose();
  }

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 4000,
        }}
      />

      {/* MODAL WRAPPER */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 5000,
          padding: "12px",
        }}
      >
        {/* SHEET */}
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            background: "#fff",
            borderRadius: "20px 20px 16px 16px",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
            padding: "18px",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {/* HANDLE */}
          <div
            style={{
              width: "50px",
              height: "5px",
              background: "#ddd",
              borderRadius: "999px",
              margin: "0 auto 12px",
            }}
          />

          {/* TITLE */}
          <h2 style={{ margin: 0 }}>{drink.name}</h2>
          <p style={{ opacity: 0.7, marginTop: "6px" }}>
            Customize your drink
          </p>

          {/* SIZE */}
          <h4 style={{ marginBottom: "8px" }}>Size</h4>

          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            {["small", "medium", "large"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "12px",
                  border:
                    size === s
                      ? "2px solid #c8a96a"
                      : "1px solid #ddd",
                  background: size === s ? "#f6efe6" : "#fff",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "600", textTransform: "uppercase" }}>
                  {s === "medium" ? "regular" : s}
                </div>

                <div style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  ${SIZE_PRICES[s].toFixed(2)}
                </div>
              </button>
            ))}
          </div>

          {/* MILK */}
          <h4 style={{ marginBottom: "8px" }}>Milk</h4>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "22px",
            }}
          >
            {["Whole Milk", "Oat Milk", "Almond Milk"].map((m) => (
              <button
                key={m}
                onClick={() => setMilk(m)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border:
                    milk === m
                      ? "2px solid #c8a96a"
                      : "1px solid #ddd",
                  background: milk === m ? "#f6efe6" : "#fff",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* ACTION */}
          <button className="btn" style={{ width: "100%" }} onClick={addToCart}>
            Add to Order • ${price.toFixed(2)}
          </button>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              marginTop: "10px",
              background: "transparent",
              border: "none",
              color: "#666",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}