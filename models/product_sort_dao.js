const prisma = require('./index');

const productSort = async () => {
    const sortedList = await prisma.$queryRaw`
      SELECT * FROM products ORDER BY like_count DESC`;
    return sortedList; 
  }

module.exports = { productSort }; 