import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';

import { Ingredient } from '../entities/Ingredient';
import { Item } from '../entities/Item';
import { ItemToIngredient } from '../entities/ItemToIngredient';
import { ItemType } from '../entities/ItemType';

interface IngredientToSave {
  quantity: number;
  ingredient: Ingredient;
}

class ItemsController {
  async create(req: Request, res: Response) {
    const itemRepository = AppDataSource.getRepository(Item);
    const itemTypeRepository = AppDataSource.getRepository(ItemType);
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const itemToIngredientRepository = AppDataSource.getRepository(ItemToIngredient);

    const { name, price, itemTypeId, ingredients = [] } = req.body;

    if (!name) return res.status(406).send({ msg: 'Name is required' });
    if (!price) return res.status(406).send({ msg: 'Price is required' });
    if (!itemTypeId) return res.status(406).send({ msg: 'Item type is required' });

    const itemExists = await itemRepository.findOneBy({
      name,
    });

    if (itemExists) return res.status(406).send({ msg: 'This item already exists' });

    const itemType = await itemTypeRepository.findOneBy({
      id: itemTypeId,
    });

    if (!itemType) return res.status(404).send({ msg: 'Item type does not exist' });

    if (itemType.desc == 'Drink') {
      var item = itemRepository.create({ name, price, itemType });
      await itemRepository.save(item);
      return res.status(201).json(item);
    }

    if (!ingredients) {
      return res.status(406).send({ msg: 'Ingredients are required' });
    }

    if (ingredients.length < 2) {
      return res.status(406).send({ msg: 'Must provide more than one ingredient' });
    }

    const ingredientsToSave: IngredientToSave[] = await Promise.all(
      ingredients.map(async (ingredient: { id: string; quantity: number }) => {
        const ingredientToSave = await ingredientRepository.findOneBy({
          id: ingredient.id,
        });

        return {
          ingredient: ingredientToSave,
          quantity: ingredient.quantity,
        };
      })
    );

    var item = itemRepository.create({
      name,
      price,
      itemType,
    });

    await itemRepository.save(item);

    ingredientsToSave.forEach(async (ingredientToSave: IngredientToSave) => {
      const itemToIngredient = itemToIngredientRepository.create({
        item,
        ingredient: ingredientToSave.ingredient,
        quantity: ingredientToSave.quantity,
      });

      await itemToIngredientRepository.save(itemToIngredient);
    });

    return res.status(201).json(item);
  }

  async all(req: Request, res: Response) {
    const itemRepository = AppDataSource.getRepository(Item);
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    const items = await itemRepository.find({
      relations: {
        itemType: true,
      },
    });

    if (items.length === 0) {
      return res.status(404).send({ msg: 'No items found' });
    }

    const formattedItems = await Promise.all(
      items.map(async (item) => {
        const ingredients = await ingredientRepository.find({
          where: {
            itemToIngredients: {
              itemId: item.id,
            },
          },
          select: {
            name: true,
          },
        });

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          type: item.itemType.desc,
          ingredients,
        };
      })
    );

    return res.json(formattedItems);
  }
}

export default new ItemsController();
