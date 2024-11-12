// middleware/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  // Ambil token dari header Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan payload token di req.user untuk akses di route
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}
