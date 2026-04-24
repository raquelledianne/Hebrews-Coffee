export default function Contact() {
  return (
    <div className="container section">

      <div style={{ maxWidth: "650px", margin: "auto" }}>

        <h1 style={{ marginBottom: "8px" }}>Visit Us</h1>
        <div className="section-divider" />

        <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
          <h3 style={{ marginBottom: "8px" }}>📍 Location</h3>
          <div className="section-divider" />
          <p>3942 Esther St. Aberdeen, TX 39403</p>
        </div>

        <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
          <h3 style={{ marginBottom: "8px" }}>🕒 Hours</h3>
          <div className="section-divider" />
          <p>Monday–Saturday: 6am–10pm</p>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <h3 style={{ marginBottom: "8px" }}>📬 Get in Touch</h3>
          <div className="section-divider" />
          <p>Email: hello@hebrewscoffee.com</p>
        </div>

      </div>
    </div>
  );
}