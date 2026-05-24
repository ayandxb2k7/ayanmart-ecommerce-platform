export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: true }
  });

  return Response.json(items);
}

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, quantity = 1 } = await request.json();

  const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
  if (!product || product.stock < quantity) {
    return Response.json({ error: 'Product unavailable' }, { status: 400 });
  }

  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId: user.id, productId: Number(productId) } },
    update: { quantity: { increment: Number(quantity) } },
    create: { userId: user.id, productId: Number(productId), quantity: Number(quantity) }
  });

  return Response.json(item);
}
