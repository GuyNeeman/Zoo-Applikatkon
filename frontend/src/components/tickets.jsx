import { useEffect, useState } from "react";

const API = "/api";

export default function Tickets() {
  const [tickets, setTickets]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [cart, setCart]         = useState({});
  const [ordered, setOrdered]   = useState(false);

  useEffect(() => {
    fetch(`${API}/tickets`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(setTickets)
      .catch(() => setError("Tickets konnten nicht geladen werden."))
      .finally(() => setLoading(false));
  }, []);

  function setQty(id, delta) {
    setCart(prev => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) { const c = { ...prev }; delete c[id]; return c; }
      return { ...prev, [id]: next };
    });
  }

  const cartItems = tickets.filter(t => cart[t.id] > 0);
  const total     = cartItems.reduce((s, t) => s + Number(t.price) * cart[t.id], 0);
  const totalQty  = Object.values(cart).reduce((s, q) => s + q, 0);

  if (loading) return <p style={{ color: "#6b7280" }}>Wird geladen…</p>;
  if (error)   return <p style={{ color: "#dc2626" }}>{error}</p>;

  if (ordered) return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <div style={{ fontSize: 52 }}>🎉</div>
      <h2 style={{ marginTop: "0.5rem" }}>Vielen Dank für deinen Kauf!</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Deine Tickets werden per E-Mail zugeschickt.
      </p>
      <button className="btn btn-primary" onClick={() => { setCart({}); setOrdered(false); }}>
        Nochmals kaufen
      </button>
    </div>
  );

  return (
    <div>
      <h2 style={{ marginBottom: "0.25rem" }}>Ticketshop</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.75rem" }}>
        Wähle deine Tickets für den BBW Zoo und kaufe direkt online.
      </p>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Ticket-Karten */}
        <div style={{ flex: "1 1 400px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "1rem" }}>
          {tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              qty={cart[ticket.id] ?? 0}
              onAdd={() => setQty(ticket.id, 1)}
              onRemove={() => setQty(ticket.id, -1)}
            />
          ))}
        </div>

        {/* Warenkorb */}
        <div style={{
          flex: "0 0 260px", border: "1px solid #e5e7eb", borderRadius: 12,
          padding: "1.25rem", background: "#f9fafb", position: "sticky", top: 20,
        }}>
          <h5 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
            🛒 Warenkorb
            {totalQty > 0 && (
              <span style={{ background: "#2563eb", color: "#fff", borderRadius: 999, fontSize: 11, padding: "1px 7px" }}>
                {totalQty}
              </span>
            )}
          </h5>

          {cartItems.length === 0 ? (
            <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Noch keine Tickets ausgewählt.</p>
          ) : (
            <>
              {cartItems.map(t => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 6 }}>
                  <span>{t.name} × {cart[t.id]}</span>
                  <span style={{ fontWeight: 600 }}>CHF {(Number(t.price) * cart[t.id]).toFixed(2)}</span>
                </div>
              ))}

              <hr style={{ margin: "0.75rem 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "1rem" }}>
                <span>Total</span>
                <span>CHF {total.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={() => setOrdered(true)}
              >
                Jetzt kaufen
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TicketCard({ ticket, qty, onAdd, onRemove }) {
  const isFree = Number(ticket.price) === 0;

  return (
    <div style={{
      border: `2px solid ${qty > 0 ? "#2563eb" : "#e5e7eb"}`,
      borderRadius: 12, padding: "1.25rem", background: "#fff",
      transition: "border-color 0.15s",
    }}>
      <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{ticket.name}</h3>
      {ticket.description && (
        <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "1rem", lineHeight: 1.4 }}>
          {ticket.description}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>
          {isFree ? "Gratis" : `CHF ${Number(ticket.price).toFixed(2)}`}
        </span>

        {qty === 0 ? (
          <button className="btn btn-sm btn-outline-primary" onClick={onAdd}>
            + Hinzufügen
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="btn btn-sm btn-outline-secondary" onClick={onRemove} style={{ lineHeight: 1, padding: "2px 8px" }}>−</button>
            <span style={{ fontWeight: 700, minWidth: 16, textAlign: "center" }}>{qty}</span>
            <button className="btn btn-sm btn-outline-secondary" onClick={onAdd} style={{ lineHeight: 1, padding: "2px 8px" }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
