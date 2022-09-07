import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Ingredient } from '../entities/Ingredient';
import { Item } from '../entities/Item';

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

  async update(req: Request, res: Response) {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    const { id } = req.params;
    const { name, price } = req.body;

    if (!id) return res.status(400).json({ msg: 'Id is required' });
    if (!name) return res.status(400).send({ msg: 'Name is required' });
    if (!price) return res.status(400).send({ msg: 'Price is required' });

    const ingredientToUpdate = await ingredientRepository.findOneByOrFail({ id });

    if (!ingredientToUpdate)
      return res.status(404).json({ msg: 'Ingredient not found' });

    ingredientToUpdate.price = price;
    ingredientToUpdate.name = name;
    await ingredientRepository.save(ingredientToUpdate);

    return res.status(200).json(ingredientToUpdate);
  }

  async delete(req: Request, res: Response) {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const itemRepository = AppDataSource.getRepository(Item);
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: 'Id is required' });

    const ingredientToDelete = await ingredientRepository.findOneByOrFail({ id });

    if (!ingredientToDelete)
      return res.status(404).json({ msg: 'Ingredient not found' });

    const itemsUsingIngredient = await itemRepository.find({
      where: {
        itemToIngredients: {
          ingredientId: ingredientToDelete.id,
        },
      },
    });

    if (itemsUsingIngredient.length != 0)
      return res.status(400).json({ msg: 'There are items using this ingredient' });

    await ingredientRepository.delete(ingredientToDelete);
    return res.status(200).json({ msg: 'Ingredient deleted successfully' });
  }

  async all(req: Request, res: Response) {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const ingredients = await ingredientRepository.find({
      order: { price: 'DESC' },
    });

    if (ingredients.length === 0) {
      return res.status(404).send({ msg: 'No ingredients found' });
    }

    return res.json(ingredients);
  }
}

export default new IngredientsController();
