import { Request, Response } from 'express';

class ItemsController {
  async all(req: Request, res: Response) {
    return res.json({
      msg: 'Working very well',
    });
  }
}

export default new ItemsController();
