export default function About() {
  return (
    <div className="container section">

      <div style={{ maxWidth: "750px", margin: "auto" }}>

        <h1 style={{ marginBottom: "8px" }}>Our Story</h1>
        <div className="section-divider" />

        <p style={{ fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "18px" }}>
          Hebrews Coffee was born from a simple desire: to create a place where
          people could slow down, feel welcomed, and be reminded that rest is
          sacred.
        </p>

        <p style={{ fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "30px" }}>
          Inspired by Hebrews 10:24–25, our name reflects a call to gather, to
          encourage one another, and to build community over something as simple
          and beautiful as a cup of coffee.
        </p>

        <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "8px" }}>Our Mission</h2>
          <div className="section-divider" />
          <p>
            To serve thoughtfully crafted coffee while fostering a space of rest,
            reflection, and genuine human connection.
          </p>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <h2 style={{ marginBottom: "8px" }}>Community Focus</h2>
          <div className="section-divider" />
          <p>
            Hebrews Coffee exists for more than caffeine—we exist for conversation,
            encouragement, and belonging. We aim to be a gathering place where
            strangers become neighbors.
          </p>
        </div>

      </div>
    </div>
  );
}