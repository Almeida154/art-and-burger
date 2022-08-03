import express from 'express';

import BurgerController from './controllers/BurgerController';

const routes = express.Router();

routes.get('/', BurgerController.all);

export default routes;
