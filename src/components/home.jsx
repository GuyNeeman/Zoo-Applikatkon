export default function HomePage() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", color: "#1a1a1a" }}>

            {/* Navigation */}
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", borderBottom: "1px solid #e5e5e5" }}>
                <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>Lumina Studio</span>
                <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
                    <li><a href="#angebot" style={linkStyle}>Angebot</a></li>
                    <li><a href="#ueber-uns" style={linkStyle}>Über uns</a></li>
                    <li><a href="#kontakt" style={linkStyle}>Kontakt</a></li>
                </ul>
            </nav>

            {/* Hero */}
            <section style={{ padding: "4rem 0 3rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "700", lineHeight: "1.25", marginBottom: "1rem" }}>
                    Willkommen bei Lumina Studio
                </h1>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.75", color: "#555", maxWidth: "52ch", marginBottom: "2rem" }}>
                    Wir gestalten digitale Erlebnisse mit Substanz — von der ersten Idee bis zur fertigen Umsetzung. Klar, durchdacht und auf Ihre Ziele ausgerichtet.
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <a href="#angebot" style={btnPrimary}>Angebot entdecken</a>
                    <a href="#kontakt" style={btnSecondary}>Kontakt aufnehmen</a>
                </div>
            </section>

            <hr style={{ border: "none", borderTop: "1px solid #e5e5e5" }} />

            {/* Angebot */}
            <section id="angebot" style={{ padding: "3rem 0" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "0.5rem" }}>Unser Angebot</h2>
                <p style={{ color: "#555", marginBottom: "2rem" }}>
                    Ein kleines, engagiertes Team mit Fokus auf Qualität und Wirkung.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                    {[
                        { title: "Konzeption & Beratung", desc: "Vom Briefing zur Strategie — wir denken mit und voraus." },
                        { title: "Gestaltung & Produktion", desc: "Visuelle Kommunikation für Web, Print und alle Kanäle." },
                        { title: "Umsetzung & Begleitung", desc: "Technische Umsetzung, Launch und laufende Unterstützung." },
                    ].map((item, i) => (
                        <div key={i} style={{ padding: "1.25rem", border: "1px solid #e5e5e5", borderRadius: "6px" }}>
                            <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>{item.title}</h3>
                            <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <hr style={{ border: "none", borderTop: "1px solid #e5e5e5" }} />

            {/* Kontakt */}
            <section id="kontakt" style={{ padding: "3rem 0" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "0.5rem" }}>Kontakt</h2>
                <p style={{ color: "#555", lineHeight: "1.75" }}>
                    Haben Sie ein Projekt im Kopf? Schreiben Sie uns — wir melden uns innerhalb von 24 Stunden.
                </p>
                <a href="mailto:hallo@luminastudio.ch" style={{ ...btnPrimary, display: "inline-block", marginTop: "1.25rem" }}>
                    hallo@luminastudio.ch
                </a>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid #e5e5e5", padding: "1.5rem 0", fontSize: "0.85rem", color: "#999" }}>
                © {new Date().getFullYear()} Lumina Studio — Zürich
            </footer>

        </div>
    );
}

const linkStyle = {
    color: "#444",
    textDecoration: "none",
    fontSize: "0.9rem",
};

const btnPrimary = {
    background: "#1a1a1a",
    color: "#fff",
    padding: "0.65rem 1.4rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
};

const btnSecondary = {
    background: "transparent",
    color: "#1a1a1a",
    padding: "0.65rem 1.4rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "0.9rem",
    border: "1px solid #ccc",
};