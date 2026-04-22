import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        background: "#f6efe6",
        padding: "14px 16px",
        borderBottom: "1px solid #e7ddd3",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <strong style={{ fontFamily: "Playfair Display" }}>
          Hebrews Coffee
        </strong>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "0.95rem",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}