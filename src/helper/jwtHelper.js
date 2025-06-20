import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'dreamtixtiketapi';
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = await verifyToken(token);
    if (decoded.type === 'customer') {
      req.customer = decoded;
    } else if (decoded.type === 'admin') {
      req.admin = decoded;
    } else {
      return res.status(403).json({ message: 'Invalid token type' });
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


export {
  generateToken,
  verifyToken,
  authenticate
};
