import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ---------------- DATA ---------------- */

const drinks = [
  {
    name: "Daily Bread Latte",
    desc: "Classic latte with warm vanilla sweetness",
    img: "/dailyBread.jpg",
    price: { small: 4.5, medium: 5.5, large: 6.5 },
  },
  {
    name: "The Promise Blend",
    desc: "Cherry-chocolate dark roast seasonal blend",
    img: "/promise.png",
    price: { small: 4.75, medium: 5.75, large: 6.75 },
  },
  {
    name: "Milk and Honey Latte",
    desc: "Espresso, steamed milk, honey, vanilla",
    img: "/milkHoney.png",
    price: { small: 4.5, medium: 5.5, large: 6.5 },
  },
  {
    name: "Armor of God Mocha",
    desc: "Bold dark chocolate mocha with espresso kick",
    img: "/armor.jpg",
    price: { small: 5, medium: 6, large: 7 },
  },
];

/* ---------------- MAIN ---------------- */

export default function FeaturedDrinks() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [size, setSize] = useState("medium");

  /* SAVE CART */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(drink) {
    const item = {
      name: drink.name,
      size,
      price: drink.price[size],
    };

    setCart([...cart, item]);
    setSelectedDrink(null);
  }

  function removeItem(index) {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  }

  return (
    <div>
      {/* CART HEADER */}
      <div style={{ marginBottom: "16px" }}>
        <strong
          onClick={() => setCartOpen(true)}
          style={{ cursor: "pointer" }}
        >
          Cart: {cart.length} item(s)
        </strong>
      </div>

      {/* DRINK GRID */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.name}
            drink={drink}
            onOrder={() => {
              setSelectedDrink(drink);
              setSize("medium");
            }}
          />
        ))}
      </motion.div>

      {/* ORDER MODAL */}
      {selectedDrink && (
        <OrderModal
          drink={selectedDrink}
          size={size}
          setSize={setSize}
          onClose={() => setSelectedDrink(null)}
          onAdd={addToCart}
        />
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}

/* ---------------- CARD ---------------- */

function DrinkCard({ drink, onOrder }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          height: "170px",
          backgroundImage: `url(${drink.img})`,
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
          }}
        >
          {drink.name}
        </h3>
      </div>

      <div style={{ padding: "14px" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          {drink.desc}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn" onClick={onOrder}>
            Order
          </button>

          <button
            onClick={() => setLiked(!liked)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
            }}
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- ORDER MODAL ---------------- */

function OrderModal({ drink, size, setSize, onClose, onAdd }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "500px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px",
          animation: "slideUp 0.25s ease",
        }}
      >
        <h2>{drink.name}</h2>
        <p style={{ color: "#666" }}>{drink.desc}</p>

        <h4>Size</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          {["small", "medium", "large"].map((s) => (
            <button
              key={s}
              className="btn"
              onClick={() => setSize(s)}
              style={{
                background: size === s ? "#6b4f3b" : "#c8a96a",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <p style={{ marginTop: "12px" }}>
          Price: <strong>${drink.price[size].toFixed(2)}</strong>
        </p>

        <button
          className="btn"
          style={{ width: "100%", marginTop: "15px" }}
          onClick={() => onAdd(drink)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ---------------- CART DRAWER ---------------- */

function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "320px",
          background: "white",
          height: "100%",
          padding: "16px",
          animation: "slideLeft 0.25s ease",
        }}
      >
        <h2>Your Order</h2>

        {cart.length === 0 ? (
          <p>No items yet</p>
        ) : (
          cart.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {item.size}
                </div>
              </div>

              <div>
                ${item.price.toFixed(2)}
                <button
                  onClick={() => onRemove(i)}
                  style={{
                    marginLeft: "8px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}

        <hr />

        <h3>Total: ${total.toFixed(2)}</h3>

        <Link to="/checkout" className="btn" style={{ width: "100%" }}>
  Go to Checkout
</Link>
      </div>
    </div>
  );
}