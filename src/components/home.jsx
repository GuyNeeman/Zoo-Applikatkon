export default function Home() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem", color: "#1a1a1a" }}>

            {/* Hero */}
            <section style={{ marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Willkommen im BBW Zoo</h1>
                <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                    Entdecke über 400 Tierarten aus aller Welt. Ein Erlebnis für die ganze Familie — lehrreich, spannend und unvergesslich.
                </p>
                <a href="#tiere" style={{ background: "#1a1a1a", color: "#fff", padding: "0.6rem 1.2rem", borderRadius: "4px", textDecoration: "none", fontSize: "0.9rem" }}>
                    Tiere entdecken
                </a>
            </section>

            {/* Angebot */}
            <section id="tiere" style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Unsere Tiere</h2>
                <ul style={{ paddingLeft: "1.2rem", color: "#555", lineHeight: "2" }}>
                    <li>Elefanten & Grosssäuger</li>
                    <li>Vögel & Reptilien</li>
                    <li>Afrikanische Savanne</li>
                    <li>Aquarium & Unterwasserwelt</li>
                </ul>
            </section>

            {/* Öffnungszeiten */}
            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Öffnungszeiten</h2>
                <p style={{ color: "#555", lineHeight: "1.7" }}>
                    Täglich geöffnet: <strong>9:00 – 18:00 Uhr</strong><br />
                    Eintritt: Erwachsene CHF 29 / Kinder CHF 14
                </p>
            </section>

            {/* Kontakt */}
            <section id="kontakt" style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Kontakt</h2>
                <p style={{ color: "#555" }}>
                    Fragen? Schreib uns: <a href="mailto:info@zoo.ch" style={{ color: "#1a1a1a" }}>info@zoo.ch</a>
                </p>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid #e5e5e5", paddingTop: "1rem", fontSize: "0.85rem", color: "#999" }}>
                © {new Date().getFullYear()} BBW-Zoo..
            </footer>
        </div>
    );
}