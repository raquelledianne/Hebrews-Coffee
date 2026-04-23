import FeaturedDrinks from "../components/FeaturedDrinks";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section
        style={{
          height: "60vh",
          minHeight: "320px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: "0 20px",
        }}
      >
        <div style={{ maxWidth: "650px" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
            Hebrews Coffee
          </h1>

          <p style={{ fontSize: "1.1rem" }}>
            “Find rest and be refreshed, one cup at a time.”
          </p>

          <div style={{ marginTop: "20px" }}>
            <Link to="/menu" className="btn">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section container">

        <FeaturedDrinks />

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link to="/menu" className="btn">
            View Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
}