const productListService = require('./product_list_service');
const slideService = require('./slide_service');
const productDetailService = require('./product_detail_service');
const productSortService = require('./product_sort_service');
const userService = require('./user_service');
const productCategoryService = require('./product_category_service');

module.exports = {
  productDetailService,
  productSortService,
  productCategoryService,
  userService,
  productListService,
  slideService,
};
