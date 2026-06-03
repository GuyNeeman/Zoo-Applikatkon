
export default function Impressum() {
    return (
        <div
            style={{
                fontFamily: "sans-serif",
                maxWidth: "680px",
                margin: "0 auto",
                padding: "2rem 1.5rem",
                color: "#1a1a1a",
            }}
        >
            {/* Header */}
            <section style={{ marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                    Impressum
                </h1>
                <p
                    style={{
                        color: "#555",
                        lineHeight: "1.7",
                    }}
                >
                    Angaben gemäss den gesetzlichen Bestimmungen.
                </p>
            </section>

            {/* Unternehmen */}
            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                    Verantwortliche Stelle
                </h2>

                <p style={{ color: "#555", lineHeight: "1.8" }}>
                    BBW Zoo AG
                    <br />
                    Musterstrasse 1
                    <br />
                    8000 Zürich
                    <br />
                    Schweiz
                </p>
            </section>

            {/* Kontakt */}
            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                    Kontakt
                </h2>

                <p style={{ color: "#555", lineHeight: "1.8" }}>
                    E-Mail:{" "}
                    <a
                        href="mailto:info@zoo.ch"
                        style={{ color: "#1a1a1a" }}
                    >
                        info@zoo.ch
                    </a>
                    <br />
                    Telefon: +41 44 123 45 67
                </p>
            </section>

            {/* Handelsregister */}
            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                    Handelsregister
                </h2>

                <p style={{ color: "#555", lineHeight: "1.7" }}>
                    Eingetragen im Handelsregister des Kantons Zürich.
                    <br />
                    UID: CHE-123.456.789
                </p>
            </section>

            {/* Haftung */}
            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                    Haftungsausschluss
                </h2>

                <p style={{ color: "#555", lineHeight: "1.7" }}>
                    Alle Angaben auf dieser Website erfolgen ohne Gewähr auf
                    Vollständigkeit, Richtigkeit und Aktualität.
                </p>
            </section>

            {/* Footer */}
            <footer
                style={{
                    borderTop: "1px solid #e5e5e5",
                    paddingTop: "1rem",
                    fontSize: "0.85rem",
                    color: "#999",
                }}
            >
                © {new Date().getFullYear()} BBW-Zoo.
            </footer>
        </div>
    );
}
