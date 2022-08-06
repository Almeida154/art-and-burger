import { AppDataSource } from '../data-source';
import { ItemType } from '../app/entities/ItemType';
import { Status } from '../app/entities/Status';
import { Ingredient } from '../app/entities/Ingredient';

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

const ingredientsSeed = async () => {
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const ingredients = await ingredientRepository.find();

  if (ingredients.length === 0) {
    // if it is not created, then create
    const createdStatuses = ingredientRepository.create([
      { name: 'Bread', price: 1.8 },
      { name: 'Tomato', price: 0.5 },
      { name: 'Cheese', price: 2 },
      { name: 'Hamburger', price: 1.6 },
      { name: 'Bacon', price: 1.4 },
      { name: 'Lettuce', price: 0.5 },
    ]);

    await ingredientRepository.save(createdStatuses);
  }
};

export { itemTypesSeed, statusSeed, ingredientsSeed };
