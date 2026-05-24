export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return Response.json(orders);
}

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true }
    });

    if (!cartItems.length) throw new Error('Cart is empty');

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw new Error(`${item.product.name} is out of stock`);
      }
    }

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await tx.order.create({
      data: { userId: user.id, total, status: 'PAID' }
    });

    for (const item of cartItems) {
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }
      });

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    await tx.cartItem.deleteMany({ where: { userId: user.id } });

    return order;
  });

  return Response.json(result);
}
