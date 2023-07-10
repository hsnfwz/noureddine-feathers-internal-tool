// config
import supabase from '$config/supabase';

const getOrderProducts = async (
  filters: {} = {},
  sort: {
    key: string,
    value: { ascending: boolean }
  } = {
    key: 'created_at',
    value: { ascending: false }
  },
  limit: number = 10
) => {
  const { data, error } = await supabase
  .from('order_product')
  .select(`
    id,
    order_id,
    profile_id,
    quantity,
    stripe_product_id (name, size, size_unit, color),
    stripe_price_id (price, quantity)
  `)
  .match(filters)
  .order(sort.key, sort.value)
  // .limit(limit)

  if (error) {
    console.log('[getOrderProducts]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[getOrderProducts]:[null]', data);
    return undefined;
  }

  return data;
}

const insertOrderProducts = async (items: []) => {
  if (!items) {
    console.log('[insertOrderProducts]:[params] items is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('order_product')
  .insert(items)
  .select()

  if (error) {
    console.log('[insertOrderProducts]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[insertOrderProducts]:[null]', data);
    return undefined;
  }

  return data;
}

export {
  getOrderProducts,
  insertOrderProducts,
}