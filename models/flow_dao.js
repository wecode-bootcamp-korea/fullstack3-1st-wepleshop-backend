const prisma = require('./index');

const flow = async () => {
  const flowlist = await prisma.$queryRaw`
    SELECT
      products.id as productId,
      products.name as productName,
      products.price as productPrice,
      product_details.quantity as productQuantity,
      product_colors.english_name as colorName,
      product_colors.hex as colorHex,
      product_sizes.name as sizeName,
      product_imgs.img_Url as imgUrl

    FROM products
    JOIN product_imgs ON products.id = product_imgs.product_id
    JOIN product_details ON products.id = product_details.product_id
    JOIN product_colors ON product_colors.id = product_details.color_id
    JOIN product_sizes ON product_sizes.id = product_details.size_id
  `;

  return flowlist;
};

module.exports = { flow };
