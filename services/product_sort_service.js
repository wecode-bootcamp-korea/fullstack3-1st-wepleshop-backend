const { productSortDao } = require("../models");

const productSort = async () => {
  const sortedList  = await productSortDao.productSort(); 
  if (!sortedList) {
      const error = new Error('DATA NOT FOUND');
      throw error;
  }
  return sortedList; 
}
module.exports = { productSort };