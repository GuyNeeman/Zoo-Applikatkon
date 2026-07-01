import { useEffect, useState } from "react";

const API = "/api";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/tickets`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setTickets)
      .catch(() => setError("Tickets konnten nicht geladen werden."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#6b7280" }}>Wird geladen…</p>;

  if (error) return <p style={{ color: "#dc2626" }}>{error}</p>;

  if (tickets.length === 0) return (
    <div>
      <h2>Tickets</h2>
      <p style={{ color: "#6b7280" }}>Aktuell sind keine Tickets verfügbar.</p>
    </div>
  );

  return (
    <div>
      <h2 style={{ marginBottom: "0.25rem" }}>Tickets</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Wähle deinen Eintritttyp für den BBW Zoo.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket }) {
  const [bought, setBought] = useState(false);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "1.25rem", background: "#f9fafb" }}>
      <h3 style={{ fontSize: "1rem", marginBottom: "0.3rem" }}>{ticket.name}</h3>
      {ticket.description && (
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
          {ticket.description}
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700 }}>CHF {Number(ticket.price).toFixed(2)}</span>
        <button
          className={`btn btn-sm ${bought ? "btn-success" : "btn-primary"}`}
          onClick={() => setBought(true)}
          disabled={bought}
        >
          {bought ? "Gekauft" : "Kaufen"}
        </button>
      </div>
    </div>
  );
}
