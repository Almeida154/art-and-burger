import { Request, Response } from 'express';

class OrderItemsController {
  async all(req: Request, res: Response) {
    return res.json({
      msg: 'Working very well',
    });
  }
}

export default new OrderItemsController();
