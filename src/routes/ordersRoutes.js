import express from 'express';
import { postOrder, fetchOrders, updateOrder } from '../controllers/ordersController.js';

const router = express.Router();
router.post('/orders', postOrder);
router.get('/orders', fetchOrders);
router.put('/orders/:id', updateOrder);
export default router;
