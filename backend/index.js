const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');

// Force IPv4 over IPv6 to prevent ENETUNREACH errors on networks that don't support IPv6
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// Initialise Firebase (Firestore + Storage) — must happen before routes
require('./config/firebase');

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
// Allow both local dev and the deployed Vercel/Netlify/Render frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  // Add your deployed frontend URL here, e.g.:
  // 'https://your-app.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }
    // Also allow any render.com or vercel.app or netlify.app domain (your own deployed frontend)
    if (
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.netlify.app') ||
      origin.endsWith('.onrender.com')
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Wave Mind Talent Hub API is running',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/offers', require('./routes/offers'));

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));

// Keep the Node.js event loop alive (prevents early exit under dotenvx/nodemon wrappers)
const keepAlive = setInterval(() => {}, 1 << 30);

// Graceful shutdown on SIGTERM (Render.com sends this on deploy/restart)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  clearInterval(keepAlive);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  clearInterval(keepAlive);
  server.close(() => process.exit(0));
});
