import { useCallback, useEffect, useMemo, useState } from "react";
import { getToken, useAuth } from "../context/AuthContext";

const API = "http://localhost:3001/api";

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/bewertungen`);
      if (!res.ok) throw new Error("load_failed");

      const data = await res.json();
      setReviews(data.reviews || []);
      setAverageRating(Number(data.averageRating || 0));
      setReviewCount(Number(data.reviewCount || 0));
    } catch {
      setError("Bewertungen konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadReviews();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadReviews]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!user) {
      setSubmitError("Bitte melde dich an, um eine Bewertung zu schreiben.");
      return;
    }

    const normalizedComment = comment.trim();
    if (!normalizedComment) {
      setSubmitError("Bitte gib einen Bewertungstext ein.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      const res = await fetch(`${API}/bewertungen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stars, comment: normalizedComment }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.message || "Bewertung konnte nicht gespeichert werden.");
        return;
      }

      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }

      setAverageRating(Number(data.averageRating || 0));
      setReviewCount(Number(data.reviewCount || 0));
      setComment("");
      setStars(5);
      setSuccessMessage("Danke! Deine Bewertung wurde gespeichert.");
    } catch {
      setSubmitError("Bewertung konnte nicht gespeichert werden.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const roundedAverage = useMemo(() => Number(averageRating).toFixed(1), [averageRating]);

  return (
    <div>
      <h2 style={{ marginBottom: "0.25rem" }}>Bewertungen</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.25rem" }}>
        Teile deine Erfahrung im Zoo mit anderen Besuchern.
      </p>

      <div className="review-summary" style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{renderStars(Math.round(averageRating))}</div>
        <p style={{ marginBottom: 0 }}>
          Durchschnitt: <strong>{roundedAverage}/5</strong> aus {reviewCount} Bewertung{reviewCount === 1 ? "" : "en"}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <label style={{ fontWeight: 600 }}>Deine Sterne</label>
        <div className="star-picker" role="radiogroup" aria-label="Sterne Auswahl">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setStars(value)}
              className="star-button"
              aria-pressed={stars === value}
            >
              <span style={{ color: value <= stars ? "#f59e0b" : "#d1d5db" }}>★</span>
            </button>
          ))}
        </div>

        <label htmlFor="reviewComment" style={{ fontWeight: 600 }}>Dein Text</label>
        <textarea
          id="reviewComment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Wie war dein Besuch?"
          maxLength={1200}
        />

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Wird gespeichert..." : "Bewertung absenden"}
        </button>

        {submitError && <p style={{ color: "#dc2626", marginBottom: 0 }}>{submitError}</p>}
        {successMessage && <p style={{ color: "#16a34a", marginBottom: 0 }}>{successMessage}</p>}
      </form>

      {loading && <p style={{ color: "#6b7280" }}>Bewertungen werden geladen...</p>}
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p style={{ color: "#6b7280" }}>Noch keine Bewertungen vorhanden.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div style={{ display: "grid", gap: "0.9rem" }}>
          {reviews.map((review) => (
            <article key={review.id} className="review-item">
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                <strong style={{ color: "#111827" }}>{review.email}</strong>
                <span style={{ color: "#f59e0b", whiteSpace: "nowrap" }}>{renderStars(review.stars)}</span>
              </div>
              <p style={{ margin: "0.6rem 0 0.45rem" }}>{review.comment}</p>
              <small style={{ color: "#6b7280" }}>
                {new Date(review.created_at).toLocaleString("de-CH")}
              </small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function renderStars(count) {
  const safeCount = Math.min(5, Math.max(0, Number(count || 0)));
  return "★★★★★".slice(0, safeCount) + "☆☆☆☆☆".slice(0, 5 - safeCount);
}
