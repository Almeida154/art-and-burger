import express from 'express';

import BurgerController from './app/controllers/ItemController';

const routes = express.Router();

routes.get('/', BurgerController.all);

export default routes;
