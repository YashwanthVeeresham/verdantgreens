import express from 'express';
import { createOrder, verifyPayment } from '../controllers/orderController.js';

const router = express.Router();

router.post('/checkout', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
