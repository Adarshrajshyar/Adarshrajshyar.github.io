require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = Number(process.env.PORT || 8080);
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5500';

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: allowedOrigin, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], credentials: false }));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.json({ service: 'ARS API scaffold', status: 'ok', productionReady: false }));
app.get('/api/status', (_req, res) => res.status(503).json({ status: 'not-configured', message: 'Authentication, database and business routes must be implemented and tested before live use.' }));

// Do not add sensitive routes until authentication, role checks, schema validation,
// CSRF/origin strategy, audit logging, rate limits and tests are implemented.
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error('Unhandled server error');
  res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => console.log(`ARS API scaffold listening on port ${PORT}`));
