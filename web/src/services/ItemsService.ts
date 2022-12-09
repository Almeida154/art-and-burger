import api from './api';

const itemsUri = 'item';

type ItemType = {
  id: number;
  desc: string | null;
};

type IngredientToSend = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Item = {
  id: string;
  name: string;
  price: number;
  itemType: ItemType | null;
  ingredients: IngredientToSend[] | null;
};

export const createItem = async (item: Item): Promise<any> => {
  try {
    const { data } = await api.post(itemsUri, {
      name: item.name,
      price: item.price,
      itemTypeId: item.itemType?.id,
      ingredients: item.ingredients,
    });

    return data;
  } catch (err: any) {
    alert(err.response.data.msg);
  }
};

export const deleteItem = async (item: Item): Promise<any> => {
  try {
    const { data } = await api.delete(`${itemsUri}/${item.id}`);
    return data;
  } catch (err: any) {
    alert(err.response.data.msg);
  }
};
