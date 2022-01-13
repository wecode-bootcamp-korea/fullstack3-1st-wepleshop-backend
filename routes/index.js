const express = require('express');
const router = express.Router();

const productRouter = require('./product_router');
const userRouter = require('./user_router');

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
