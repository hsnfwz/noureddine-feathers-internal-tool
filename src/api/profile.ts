// interfaces
import type I_Profile from '$interfaces/I_Profile';

// config
import supabase from '$config/supabase';

const getProfileById = async (id: string): Promise<I_Profile | undefined> => {
  const { data, error } = await supabase
  .from('user_profile')
  .select(`
    id,
    is_admin
  `)
  .match({ id });

  if (error) {
    console.log('[getProfileById]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[getProfileById]:[null]', data);
    return undefined;
  }

  return data[0];
}

export {
  getProfileById,
}