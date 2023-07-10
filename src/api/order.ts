// config
import supabase from '$config/supabase';

const getOrders = async (
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
  .from('order')
  .select(`
    id,
    created_at,
    profile_id,
    shipping_address_city,
    shipping_address_state,
    shipping_address_country,
    shipping_address_postal_code,
    shipping_address_line1,
    shipping_address_line2,
    stripe_receipt_url,
    is_fulfilled,
    tracking_id
  `)
  .match(filters)
  .order(sort.key, sort.value)
  // .limit(limit)

  if (error) {
    console.log('[getOrders]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[getOrders]:[null]', data);
    return undefined;
  }

  return data;
}

const insertOrder = async (item: any) => {
  if (!item) {
    console.log('[insertOrder]:[params] item is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('order')
  .insert(item)
  .select()

  if (error) {
    console.log('[insertOrder]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[insertOrder]:[null]', data);
    return undefined;
  }

  return data[0];
}

const updateOrder = async (orderId: number, item: any) => {
  if (!orderId) {
    console.log('[updateOrder]:[params] orderId is required.');
    return undefined;
  }
  
  if (!item) {
    console.log('[updateOrder]:[params] item is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('order')
  .update(item)
  .match({ id: orderId })
  .select();

  if (error) {
    console.log('[updateOrder]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[updateOrder]:[null]', data);
    return undefined;
  }

  return data[0];
}

export {
  getOrders,
  insertOrder,
  updateOrder,
}