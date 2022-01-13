const { productListDao } = require('../models');

const productList = async (categoryId, subCategoryId, sortWord) => {
  let sortOption = '';
  if (sortWord === 'popular') {
    sortOption = 'ORDER BY like_count DESC';
  }
  const list = await productListDao.productList(
    categoryId,
    subCategoryId,
    sortOption
  );

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  return list;
};

module.exports = { productList };
