import express from 'express';

import IngredientsController from './app/controllers/IngredientsController';
import ItemsController from './app/controllers/ItemsController';
import OrdersController from './app/controllers/OrdersController';

import ItemTypesController from './app/controllers/ItemTypesController';
import StatusController from './app/controllers/StatusController';

const routes = express.Router();

routes.get('/ingredients', IngredientsController.all);
routes.post('/ingredient', IngredientsController.create);

routes.get('/items', ItemsController.all);
routes.post('/item', ItemsController.create);

routes.get('/orders', OrdersController.all);
routes.get('/orders/count', OrdersController.count);
routes.get('/orders/:status', OrdersController.allByStatus);
routes.post('/order', OrdersController.create);

routes.get('/status', StatusController.all);
routes.get('/item-types', ItemTypesController.all);

export default routes;
