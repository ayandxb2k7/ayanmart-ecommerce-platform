export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return Response.json({ error: 'Email already registered' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: 'USER' }
  });

  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  return Response.json({ token: signToken(safeUser), user: safeUser });
}
