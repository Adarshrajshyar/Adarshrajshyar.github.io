# ARS backend scaffold (not production-ready)

This folder is included now so the future backend can be developed without rebuilding the website. The Node/Express application currently exposes only a health/status endpoint. There is no live user login, database persistence, exam engine, result processing or certificate issuance.

## Local setup
1. Install Node.js 20 or newer.
2. In this folder, copy `.env.example` to `.env` and set the local frontend origin.
3. Run `npm install` and `npm run dev`.
4. Visit `http://localhost:8080/api/health`.

Do not deploy this as a production application and do not put real personal data into it. Do not commit `.env`, passwords or service-role keys. For a future production stage, add verified authentication, role checks, request schemas, server-side exam timing/scoring, controlled certificate issuance, retention/deletion rules, audit logging, database migrations, monitoring and security tests.
