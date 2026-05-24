const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass = await bcrypt.hash('user123', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Ayan Admin', email: 'admin@ayanmart.com', password: adminPass, role: 'ADMIN' },
      { name: 'Demo User', email: 'user@ayanmart.com', password: userPass, role: 'USER' }
    ]
  });

  await prisma.product.createMany({
    data: [
      { name: 'Wireless Headphones', description: 'Bluetooth headphones with long battery life.', price: 2499, stock: 25, category: 'Electronics', image: 'Audio' },
      { name: 'Smart Watch', description: 'Fitness tracking smart watch with notifications.', price: 3499, stock: 15, category: 'Electronics', image: 'Watch' },
      { name: 'Laptop Backpack', description: 'Durable backpack with laptop compartment.', price: 1299, stock: 30, category: 'Accessories', image: 'Bag' },
      { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard for productivity and gaming.', price: 2999, stock: 18, category: 'Electronics', image: 'Keyboard' },
      { name: 'Cotton Hoodie', description: 'Comfortable casual hoodie.', price: 999, stock: 40, category: 'Clothing', image: 'Hoodie' },
      { name: 'Desk Lamp', description: 'Adjustable LED desk lamp.', price: 799, stock: 22, category: 'Home', image: 'Lamp' }
    ]
  });

  console.log('Seed completed.');
  console.log('Admin login: admin@ayanmart.com / admin123');
  console.log('User login: user@ayanmart.com / user123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
