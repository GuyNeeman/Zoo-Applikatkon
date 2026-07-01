# Zoo Applikation

## Mitglieder: Sebastian Willmann, Silvan Castelberg, Guy Neeman

Webapplikation für den BBW Zoo — gebaut mit **React + Vite** (Frontend) und **Node.js + Express + MySQL** (Backend).

---

## Projektstruktur

```
Zoo-Applikation/
├── frontend/
│   ├── src/
│   │   ├── components/       home, about, contact, impressum, privacy, login, register, tickets
│   │   ├── context/          AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── config/               db.js
│   ├── controllers/          authController.js, ticketController.js
│   ├── middleware/            auth.js
│   ├── routes/               auth.js, tickets.js
│   ├── database/             schema.sql
│   ├── Dockerfile
│   └── server.js
├── docker-compose.yml
├── cloud-init.yml
└── .env.example
```

---

## Lokal starten

### Voraussetzungen
- Node.js ≥ 18
- MySQL läuft lokal

### Installation

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Konfiguration

`backend/.env` erstellen (Vorlage: `backend/.env.example`):

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

> Tabellen werden beim ersten Start automatisch erstellt.

### Starten

```bash
# Terminal 1
cd frontend && npm run dev

# Terminal 2
cd backend && npm run dev
```

| Dienst   | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:3001  |

---

## Mit Docker starten

### Voraussetzungen
- Docker & Docker Compose

### Konfiguration

```bash
cp .env.example .env
```

`.env` ausfüllen:

```env
DB_PASSWORD=einSicheresPasswort
DB_NAME=zoo_db
JWT_SECRET=einLangerZufälligerString
```

### Starten

```bash
docker compose up --build -d
```

App läuft auf **http://localhost**

```bash
# Logs
docker compose logs -f

# Stoppen
docker compose down
```

---

## API-Endpunkte

### Auth
| Methode | Pfad                 | Auth  | Beschreibung              |
|---------|----------------------|-------|---------------------------|
| POST    | `/api/auth/register` | —     | Konto erstellen           |
| POST    | `/api/auth/login`    | —     | Anmelden, gibt JWT zurück |
| GET     | `/api/auth/me`       | JWT   | Eingeloggten User abrufen |

### Tickets
| Methode | Pfad                 | Auth        | Beschreibung        |
|---------|----------------------|-------------|---------------------|
| GET     | `/api/tickets`       | —           | Alle Tickets laden  |
| GET     | `/api/tickets/:id`   | —           | Ein Ticket laden    |
| POST    | `/api/tickets`       | JWT (Admin) | Ticket erstellen    |
| PUT     | `/api/tickets/:id`   | JWT (Admin) | Ticket bearbeiten   |
| DELETE  | `/api/tickets/:id`   | JWT (Admin) | Ticket löschen      |
