const { productListService } = require('../services');

const productList = async (req, res) => {
  try {
    const { id } = req.body;
    const list = await productListService.productList(id);
    return res.status(201).json({ message: 'ProductList', list });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'ProductList Load Fail' });
  }
};

module.exports = { productList };
