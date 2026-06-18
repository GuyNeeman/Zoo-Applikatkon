export default function Contact() {
    return (
  <div className="container">
    <h1>Kontakt</h1>

    <p>
      Haben Sie Fragen, Anregungen oder möchten Sie mehr über unseren Zoo
      erfahren? Wir freuen uns auf Ihre Nachricht.
    </p>

    <section>
      <h2>Kontaktinformationen</h2>

      <p>
        <strong>Adresse:</strong>
        <br />
        Zoo Musterstadt
        <br />
        Musterstrasse 123
        <br />
        8000 Zürich
      </p>

      <p>
        <strong>Telefon:</strong> +41 XX XXX XX XX
        <br />
        <strong>E-Mail:</strong> info@zoo.ch
      </p>

      <p>
        <strong>Öffnungszeiten:</strong>
        <br />
        Montag – Sonntag: 09:00 – 18:00 Uhr
      </p>
    </section>

    <section>
      <h2>Kontaktformular</h2>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" name="name" required />
        </div>

        <br />

        <div>
          <label htmlFor="email">E-Mail</label>
          <br />
          <input type="email" id="email" name="email" required />
        </div>

        <br />

        <div>
          <label htmlFor="message">Nachricht</label>
          <br />
          <textarea
            id="message"
            name="message"
            rows="5"
            required
          ></textarea>
        </div>

        <br />

        <button type="submit">Nachricht senden</button>
      </form>
    </section>
  </div>
);
}