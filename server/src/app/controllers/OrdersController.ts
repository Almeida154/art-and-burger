import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';

import { Item } from '../entities/Item';
import { Order } from '../entities/Order';
import { OrderToItem } from '../entities/OrderToItem';
import { Status } from '../entities/Status';

class OrdersController {
  async create(req: Request, res: Response) {
    const itemRepository = AppDataSource.getRepository(Item);
    const orderRepository = AppDataSource.getRepository(Order);
    const orderToItemRepository = AppDataSource.getRepository(OrderToItem);
    const statusRepository = AppDataSource.getRepository(Status);

    const { itemIds, totalPrice } = req.body;

    if (!itemIds) return res.status(406).send({ msg: 'Items are required' });
    if (!totalPrice) return res.status(406).send({ msg: 'Total price is required' });

    const items = await Promise.all(
      itemIds.map(async (itemId: string) => {
        return await itemRepository.findOneBy({
          id: itemId,
        });
      })
    );

    const status = await statusRepository.findOneBy({
      desc: 'Pending',
    });

    const order = orderRepository.create({
      totalPrice,
      status,
      orderedAt: '2022-08-06',
    });

    await orderRepository.save(order);

    items.map(async (item) => {
      const orderToItem = orderToItemRepository.create({
        item,
        order,
      });
      await orderToItemRepository.save(orderToItem);
    });

    return res.status(200).json(order);
  }

  async all(req: Request, res: Response) {
    const orderRepository = AppDataSource.getRepository(Order);
    const itemsRepository = AppDataSource.getRepository(Item);

    const orders = await orderRepository.find({
      relations: {
        orderToItems: {
          order: true,
        },
        status: true,
      },
    });

    if (orders.length === 0) {
      return res.status(400).json({ error: 'No orders found' });
    }

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await itemsRepository.find({
          where: { orderToItems: { orderId: order.id } },
        });

        return {
          id: order.id,
          totalPrice: order.totalPrice,
          orderedAt: order.orderedAt,
          status: order.status.desc,
          items,
        };
      })
    );

    return res.status(200).json({ orders: formattedOrders });
  }

  async count(req: Request, res: Response) {
    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.count();

    return res.status(200).json(orders);
  }

  async allByStatus(req: Request, res: Response) {
    const { status } = req.params;

    const orderRepository = AppDataSource.getRepository(Order);
    const itemsRepository = AppDataSource.getRepository(Item);

    const orders = await orderRepository.find({
      relations: {
        orderToItems: {
          order: true,
        },
        status: true,
      },

      where: {
        status: {
          desc: status,
        },
      },
    });

    if (orders.length === 0) {
      return res.status(400).json({ error: 'No orders found' });
    }

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await itemsRepository.find({
          where: {
            itemToIngredients: {
              item: true,
            },
          },
        });

        return {
          id: order.id,
          totalPrice: order.totalPrice,
          orderedAt: order.orderedAt,
          status: order.status.desc,
          items,
        };
      })
    );

    return res.status(200).json(formattedOrders);
  }
}

export default new OrdersController();
