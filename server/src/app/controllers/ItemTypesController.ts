import { Request, Response } from 'express';

import { AppDataSource } from '../../data-source';
import { ItemType } from '../entities/ItemType';

class ItemTypesController {
  async all(req: Request, res: Response) {
    const itemTypeRepository = AppDataSource.getRepository(ItemType);
    const itemTypes = await itemTypeRepository.find();

    if (itemTypes.length === 0) {
      return res.json({ msg: 'No Item Types' });
    }

    return res.json({ itemTypes });
  }
}

export default new ItemTypesController();
