import { Router } from 'express';
import OrderController from '@/controllers/OrderControllers';

const router = Router();

router.post('/', OrderController.addOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrderById);

export default router;
