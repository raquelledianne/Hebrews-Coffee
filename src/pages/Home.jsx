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
    position: "relative",
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
    overflow: "hidden",
  }}
>
  {/* STEAM */}
  <div className="steam-container" />

  {/* CONTENT */}
  <div style={{ maxWidth: "650px", position: "relative", zIndex: 2 }}>
    <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "10px" }}>
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