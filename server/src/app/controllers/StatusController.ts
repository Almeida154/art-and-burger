import { Request, Response } from 'express';

import { AppDataSource } from '../../data-source';
import { Status } from '../entities/Status';

class StatusController {
  async all(req: Request, res: Response) {
    const statusRepository = AppDataSource.getRepository(Status);
    const statuses = await statusRepository.find();

    if (statuses.length === 0) {
      return res.json({ msg: 'No status' });
    }

    return res.json({ statuses });
  }
}

export default new StatusController();
