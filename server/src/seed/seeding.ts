import { AppDataSource } from '../data-source';
import { ItemType } from '../app/entities/ItemType';
import { Status } from '../app/entities/Status';

const itemTypesSeed = async () => {
  const itemTypeRepository = AppDataSource.getRepository(ItemType);
  const itemTypes = await itemTypeRepository.find();

  if (itemTypes.length === 0) {
    // if it is not created, then create
    const createdItemTypes = itemTypeRepository.create([
      { desc: 'Meat' },
      { desc: 'Veggie' },
      { desc: 'Drink' },
    ]);

    await itemTypeRepository.save(createdItemTypes);
  }
};

const statusSeed = async () => {
  const statusRepository = AppDataSource.getRepository(Status);
  const statuses = await statusRepository.find();

  if (statuses.length === 0) {
    // if it is not created, then create
    const createdStatuses = statusRepository.create([
      { desc: 'Pending' },
      { desc: 'Accepted' },
      { desc: 'Done' },
    ]);

    await statusRepository.save(createdStatuses);
  }
};

export { itemTypesSeed, statusSeed };
