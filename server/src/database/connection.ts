import { AppDataSource } from '../data-source';
import { ingredientsSeed, itemTypesSeed, statusSeed } from '../seed/seeding';

const connection = () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log('📦 Database connected successfully');
      await itemTypesSeed();
      await statusSeed();
      await ingredientsSeed();
    })
    .catch((error) => console.log(error));
};

export default connection;
