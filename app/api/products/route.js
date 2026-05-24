export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


import { prisma } from '../../../lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' }
  });
  return Response.json(products);
}
