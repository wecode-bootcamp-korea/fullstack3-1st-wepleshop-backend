const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

const productCartDao = require('./product_cart_dao');
const productDetailDao = require('./product_detail_dao');
const productSortDao = require('./product_sort_dao');
const productCategoryDao = require('./product_category_dao');
const userDao = require('./user_dao');
const productListDao = require('./product_list_dao');
const slideDao = require('./slide_dao');
const flowDao = require('./flow_dao');

module.exports = {
  productCartDao,
  productDetailDao,
  productSortDao,
  productCategoryDao,
  userDao,
  productListDao,
  slideDao,
  flowDao,
};
