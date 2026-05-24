import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '7d' }
  );
}

export function getUserFromRequest(request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
  } catch {
    return null;
  }
}
