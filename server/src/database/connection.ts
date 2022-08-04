import { AppDataSource } from '../data-source';
import { itemTypesSeed, statusSeed } from '../seed/seeding';

const connection = () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log('📦 Database connected successfully');
      await itemTypesSeed();
      await statusSeed();
    })
    .catch((error) => console.log(error));
};

export default connection;
