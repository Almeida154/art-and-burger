import { Request, Response } from 'express';

class ItemController {
  async all(req: Request, res: Response) {
    return res.json({
      msg: 'Working very well',
    });
  }
}

export default new ItemController();
