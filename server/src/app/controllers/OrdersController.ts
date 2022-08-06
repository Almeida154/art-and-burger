import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Order } from '../entities/Order';

class OrdersController {
  async create(req: Request, res: Response) {}

  async all(req: Request, res: Response) {
    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.find();

    if (orders.length === 0) {
      return res.status(400).json({ error: 'No orders found' });
    }

    return res.status(200).json(orders);
  }

  async allByStatus(req: Request, res: Response) {
    const { status } = req.params;

    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.findBy({
      status: {
        desc: status,
      },
    });

    if (orders.length === 0) {
      return res.status(400).json({ error: 'No orders found' });
    }

    return res.status(200).json(orders);
  }
}

export default new OrdersController();
