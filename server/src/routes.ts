import express from 'express';
import IngredientsController from './app/controllers/IngredientsController';

import ItemTypesController from './app/controllers/ItemTypesController';
import StatusController from './app/controllers/StatusController';

const routes = express.Router();

routes.get('/ingredients', IngredientsController.all);
routes.post('/ingredient', IngredientsController.create);

routes.get('/status', StatusController.all);
routes.get('/item-types', ItemTypesController.all);

export default routes;
