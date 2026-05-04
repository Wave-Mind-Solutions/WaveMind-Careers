const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existing = await db.collection('users').where('email', '==', email).limit(1).get();
    if (!existing.empty) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || 'HR',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('users').add(userData);
    const token = jwt.sign({ id: docRef.id, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: docRef.id, name, email, role: userData.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snap = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snap.empty) return res.status(400).json({ message: 'Invalid credentials' });

    const doc = snap.docs[0];
    const user = doc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doc.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: doc.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'User not found' });

    const { password, ...userWithoutPassword } = doc.data();
    res.json({ id: doc.id, ...userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
