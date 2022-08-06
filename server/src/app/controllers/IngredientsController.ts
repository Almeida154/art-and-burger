import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Ingredient } from '../entities/Ingredient';

class IngredientsController {
  async create(req: Request, res: Response) {
    const { name, price } = req.body;

    if (!name) return res.status(406).send({ msg: 'Name is required' });
    if (!price) return res.status(406).send({ msg: 'Price is required' });

    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const createdIngredient = ingredientRepository.create({ name, price });
    await ingredientRepository.save(createdIngredient);

    return res.status(201).json(createdIngredient);
  }

  async all(req: Request, res: Response) {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const ingredients = await ingredientRepository.find();

    if (ingredients.length === 0) {
      return res.status(404).send({ msg: 'No ingredients found' });
    }

    return res.json(ingredients);
  }
}

export default new IngredientsController();
