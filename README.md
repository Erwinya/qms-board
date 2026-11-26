# qms-board

Quality operations board for **inspection** and **NCR** summaries.

Repository: [Erwinya/qms-board](https://github.com/Erwinya/qms-board)

Companion APIs:

- [qms-inspection-service](https://github.com/Erwinya/qms-inspection-service)
- [qms-ncr-service](https://github.com/Erwinya/qms-ncr-service)

## Features

- Board overview with active/failed inspections and open/contained NCRs
- Clickable summary cards with exact multi-status and result filters
- Status filter chips on Inspections / NCR pages
- Inspections table (status, result, related NCR links)
- NCR queue (severity, status, containment)
- Sample semiconductor lot data (ready to swap for live API later)
- GitHub Actions CI (`npm run lint` + `npm test` + `npm run build`)

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS


## Screenshot

![QMS Board overview](docs/board.png)

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

## Test

```bash
npm test
```

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
