export interface Item {
  _id: string | number;
  price: number;
  sale_price: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, '_id'>> {}

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem._id === item._id
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  _id: Item['_id'],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item._id === _id) {
      const newQuantity = item.quantity! - quantity;
      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], _id: Item['_id']) {
  return items.find((item) => item._id === _id);
}

export function updateItem(
  items: Item[],
  _id: Item['_id'],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem._id === _id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], _id: Item['_id']) {
  return items.filter((existingItem) => existingItem._id !== _id);
}

export function inStock(items: Item[], _id: Item['_id']) {
  const item = getItem(items, _id);
  if (item) return item['quantity']! < item['stock']!;
  return false;
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.sale_price * item.quantity!,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.quantity! * item.sale_price, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
