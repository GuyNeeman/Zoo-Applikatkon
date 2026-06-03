export default function Home() {
    return (
  <div className="container">
    {/* Header */}
    <header>
      <strong>BBW Zoo</strong>
    </header>

    {/* Hero */}
    <section>
      <h1>Willkommen im BBW Zoo</h1>
      <p>
        Entdecke über 400 Tierarten aus aller Welt. Ein Erlebnis für die ganze
        Familie — lehrreich, spannend und unvergesslich.
      </p>

      <a href="#tiere">Tiere entdecken</a>
    </section>

    {/* Tiere */}
    <section id="tiere">
      <h2>Unsere Tiere</h2>
      <ul>
        <li>Elefanten & Grosssäuger</li>
        <li>Vögel & Reptilien</li>
        <li>Afrikanische Savanne</li>
        <li>Aquarium & Unterwasserwelt</li>
      </ul>
    </section>

    {/* Öffnungszeiten */}
    <section>
      <h2>Öffnungszeiten</h2>
      <p>
        Täglich geöffnet: <strong>9:00 – 18:00 Uhr</strong>
        <br />
        Eintritt: Erwachsene CHF 29 / Kinder CHF 14
      </p>
    </section>

    {/* Kontakt */}
    <section id="kontakt">
      <h2>Kontakt</h2>
      <p>
        Fragen? Schreib uns:{" "}
        <a href="mailto:info@zoo.ch">info@zoo.ch</a>
      </p>
    </section>

    {/* Footer */}
    <footer>
      © {new Date().getFullYear()} BBW-Zoo
    </footer>
  </div>
);
}