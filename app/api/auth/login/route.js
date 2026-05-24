export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return Response.json({ error: 'Invalid credentials' }, { status: 401 });

  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  return Response.json({ token: signToken(safeUser), user: safeUser });
}
