export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../../lib/prisma';
import { getUserFromRequest } from '../../../../lib/auth';

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== 'ADMIN') {
    return Response.json({ error: 'Admin access required' }, { status: 403 });
  }

  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      stock: Number(body.stock),
      category: body.category,
      image: body.image || 'Product',
      active: true
    }
  });

  return Response.json(product);
}
