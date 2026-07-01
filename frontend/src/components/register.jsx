import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = "/api";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwörter stimmen nicht überein");
      return;
    }

    if (form.password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrierung fehlgeschlagen");
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch {
      setError("Server nicht erreichbar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Konto erstellen</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>E-Mail</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="deine@email.ch"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label style={labelStyle}>Passwort</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mindestens 8 Zeichen"
            required
            autoComplete="new-password"
          />
        </div>

        <div>
          <label style={labelStyle}>Passwort bestätigen</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100"
          style={{ marginTop: "0.5rem" }}
        >
          {loading ? "Wird registriert…" : "Registrieren"}
        </button>
      </form>

      <p style={{ marginTop: "1.25rem", color: "var(--muted)", fontSize: "0.9rem" }}>
        Bereits ein Konto?{" "}
        <Link to="/login">Anmelden</Link>
      </p>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "0.35rem",
  fontWeight: 500,
  fontSize: "0.9rem",
  color: "var(--heading)",
};

const errorStyle = {
  color: "#dc2626",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: 8,
  padding: "0.6rem 0.9rem",
  fontSize: "0.9rem",
  margin: 0,
};
