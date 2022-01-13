const { productSortService } = require('../services');

const productSort = async (req, res) => {
  try {
    const sortedProducts = await productSortService.productSort();

    return res.status(200).json({ data: sortedProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { productSort };
