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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/offers', require('./routes/offers'));

app.get('/', (req, res) => {
  res.send('Wave Mind Talent Hub API is running (Firebase)...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Keep the process alive
setInterval(() => {}, 60000);
