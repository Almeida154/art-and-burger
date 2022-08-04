import express from 'express';

import ItemTypesController from './app/controllers/ItemTypesController';
import StatusController from './app/controllers/StatusController';

const routes = express.Router();

routes.get('/status', StatusController.all);
routes.get('/item-types', ItemTypesController.all);

export default routes;
