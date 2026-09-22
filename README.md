# qms-board

Quality operations board for **inspection** and **NCR** summaries.

Repository: [Erwinya/qms-board](https://github.com/Erwinya/qms-board)

Companion APIs:

- [qms-inspection-service](https://github.com/Erwinya/qms-inspection-service)
- [qms-ncr-service](https://github.com/Erwinya/qms-ncr-service)

## Features

- Board overview with active/failed inspections and open/contained NCRs
- Inspections table (status, result, related NCR)
- NCR queue (severity, status, containment)
- Sample semiconductor lot data (ready to swap for live API later)

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS

## Run

```bash
npm install
npm run dev
```

Windows PowerShell:

```powershell
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

```powershell
npm run build
npm start
```

## License

MIT
