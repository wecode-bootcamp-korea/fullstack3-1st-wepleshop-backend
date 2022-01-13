const { productCategoryDao } = require('../models');

const categories = async () => {
  return await productCategoryDao.getCategories();
};

const subCategories = async () => {
  return await productCategoryDao.getSubCategories();
};

const filterCategories = async (category_id, sub_category_id) => {
  const [category] = await productCategoryDao.findCategories(
    category_id,
    sub_category_id
  );

  if (!category) {
    const error = new Error('Not exist category');
    error.statusCode = 400;

    throw error;
  }

  return category;
};

module.exports = { categories, subCategories, filterCategories };
