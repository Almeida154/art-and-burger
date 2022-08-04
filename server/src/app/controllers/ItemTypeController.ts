import { Request, Response } from 'express';

class ItemTypeController {
  async all(req: Request, res: Response) {
    return res.json({
      msg: 'Working very well',
    });
  }
}

export default new ItemTypeController();
