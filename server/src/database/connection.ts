import { AppDataSource } from '../data-source';

const connection = () => {
  AppDataSource.initialize()
    .then(() => console.log('📦 Database connected successfully'))
    .catch((error) => console.log(error));
};

export default connection;
