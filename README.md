# Zoo Applikation

## Mitglieder: Sebastian Willmann, Silvan Castelberg, Guy Neeman

Webapplikation für den BBW Zoo — gebaut mit **React + Vite** (Frontend) und **Node.js + Express + MySQL** (Backend).

---

## Voraussetzungen

- Node.js ≥ 18
- MySQL-Datenbank (lokal oder remote)

---

## Installation

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
npm install
```

---

## Konfiguration

Im `backend/`-Ordner eine `.env`-Datei erstellen (Vorlage: `.env.example`):

```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=zoo_db

JWT_SECRET=langer_zufaelliger_string
JWT_EXPIRES_IN=7d
```

> Die Datenbank `zoo_db` muss in MySQL existieren. Die Tabellen werden beim ersten Start automatisch erstellt.

---

## Starten

```bash
# Terminal 1 – Frontend
npm run dev

# Terminal 2 – Backend
cd backend
npm run dev
```

| Dienst   | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:3001      |

---

## Projektstruktur

```
Zoo-Applikation/
├── src/
│   ├── components/
│   │   ├── home.jsx
│   │   ├── about.jsx
│   │   ├── contact.jsx
│   │   ├── login.jsx
│   │   └── register.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   └── auth.js
│   ├── database/
│   │   └── schema.sql
│   └── server.js
├── index.html
└── package.json
```

---

## API-Endpunkte

| Methode | Pfad                  | Auth | Beschreibung              |
|---------|-----------------------|------|---------------------------|
| POST    | `/api/auth/register`  | —    | Konto erstellen           |
| POST    | `/api/auth/login`     | —    | Anmelden, gibt JWT zurück |
| GET     | `/api/auth/me`        | JWT  | Eingeloggten User abrufen |

---

## Scripts

### Frontend
- `npm run dev` – Entwicklungsserver starten
- `npm run build` – Produktions-Bundle erstellen
- `npm run preview` – gebautes Projekt lokal anzeigen

### Backend
- `npm run dev` – Backend mit Auto-Reload starten (nodemon)
- `npm start` – Backend ohne Auto-Reload starten
