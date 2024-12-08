import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const categoriesData = [
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' }
  ]

  await prisma.category.createMany({
    data: categoriesData
  })

  // Step 2: Fetch created categories to get their IDs
  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: categoriesData.map(c => c.name)
      }
    }
  })

  // Step 3: Create subcategories
  const subcategoriesData = categories.flatMap(category => {
    if (category.name === 'Electronics') {
      return [
        { name: 'Smartphones', categoryId: category.id },
        { name: 'Laptops', categoryId: category.id },
        { name: 'Tablets', categoryId: category.id }
      ]
    } else if (category.name === 'Books') {
      return [
        { name: 'Fiction', categoryId: category.id },
        { name: 'Non-fiction', categoryId: category.id }
      ]
    } else if (category.name === 'Clothing') {
      return [
        { name: 'Men', categoryId: category.id },
        { name: 'Women', categoryId: category.id },
        { name: 'Kids', categoryId: category.id }
      ]
    }
    return []
  })

  await prisma.subcategories.createMany({
    data: subcategoriesData
  })

}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });