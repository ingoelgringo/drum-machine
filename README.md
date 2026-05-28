# DRUM-MACHINE

En interaktiv webbapplikation för att skapa och spela trumbeats. Detta projekt genomfördes som en lärande övning i **testning** och fullstack-utveckling, med fokus på att implementera end-to-end och komponent tester med Cypress.

## Tech Stack

### Frontend

- **React 19** - UI-komponentbibliotek
- **React Router 7** - Navigering mellan vyer
- **TypeScript** - Typsäker JavaScript
- **Vite** - Snabb build-tool och dev-server
- **Tone.js** - Web Audio API-bibliotek för ljudsyntes
- **Cypress** - End-to-end testing

### Backend

- **Node.js** med **TypeScript**
- **Express 5** - REST API-ramverk
- **PostgreSQL** - Relationsdatabas
- **TSX** - TypeScript-exekvering

## Utveckling

### Installera beroenden

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Starta utvecklingsserver

```bash
# Frontend (från frontend-mappen)
npm run dev

# Backend (från backend-mappen)
npm run dev
```

### Bygga för produktion

```bash
# Frontend
npm run build

# Kör preview
npm run preview
```

### Testning

```bash
# Frontend - E2E-test med Cypress
npm run cypress

# Linting
npm run lint
```

## Repository

[GitHub: ingoelgringo/drum-machine](https://github.com/ingoelgringo/drum-machine)
