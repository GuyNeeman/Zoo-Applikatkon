// src/pages/Datenschutz.jsx

import React from "react";

function Datenschutz() {
  return (
    <div className="container">
      <h1>Datenschutzerklärung</h1>

      <p>
        Der Schutz Ihrer persönlichen Daten ist uns wichtig. Auf dieser Seite
        informieren wir Sie darüber, welche Daten wir erheben, wie wir diese
        verwenden und welche Rechte Sie haben.
      </p>

      <section>
        <h2>1. Datenerhebung</h2>
        <p>
          Beim Besuch unserer Website können verschiedene Daten erfasst werden.
          Dazu gehören technische Informationen wie IP-Adresse, Browsertyp,
          Betriebssystem sowie Datum und Uhrzeit des Zugriffs.
        </p>
        <p>
          Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig
          über Formulare oder andere Eingabemöglichkeiten bereitstellen.
        </p>
      </section>

      <section>
        <h2>2. Nutzung von Drittdiensten</h2>
        <p>
          Auf unserer Website können Dienste von Drittanbietern eingebunden
          sein, beispielsweise Karten-, Analyse- oder Hosting-Dienste.
        </p>
        <p>
          Dabei können Daten an die jeweiligen Anbieter übertragen werden. Die
          Verarbeitung erfolgt gemäß den Datenschutzbestimmungen der
          entsprechenden Anbieter.
        </p>
      </section>

      <section>
        <h2>3. Rechte der Nutzer</h2>
        <p>Sie haben das Recht auf:</p>

        <ul>
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
        </ul>
      </section>

      <section>
        <h2>4. Kontakt für Datenschutzanfragen</h2>
        <p>
          Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie
          uns kontaktieren:
        </p>

        <p>
          <strong>E-Mail:</strong> datenschutz@ihre-domain.ch
          <br />
          <strong>Telefon:</strong> +41 XX XXX XX XX
        </p>
      </section>

      <section>
        <h2>5. Rechtlicher Hinweis</h2>
        <p>
          Diese Datenschutzerklärung sollte vor der Veröffentlichung von einer
          rechtlich qualifizierten Person geprüft werden.
        </p>
      </section>
    </div>
  );
}

export default Datenschutz;