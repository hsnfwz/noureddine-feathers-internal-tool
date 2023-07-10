// config
import supabase from '$config/supabase';

const getPublicUrl = (path: string) => {
  const { data } = supabase
  .storage
  .from('noureddine-feathers')
  .getPublicUrl(path);

  const { publicUrl } = data;
  
  return publicUrl;
}

const getProductImagePublicUrls = async (folderName: string): Promise<string[] | undefined> => {
  let productImagePublicUrls: string[] = [];

  const { data, error } = await supabase
  .storage
  .from('noureddine-feathers')
  .list(folderName, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.log('[getProductImagePublicUrls]:[error]', error);
    return productImagePublicUrls;
  }

  if (!data) {
    console.log('[getProductImagePublicUrls]:[null]', data);
    return productImagePublicUrls;
  }

  data.forEach((obj: any) => {
    if (obj.name !== '.emptyFolderPlaceholder') {
      const { data } = supabase
      .storage
      .from('noureddine-feathers')
      .getPublicUrl(`${folderName}/${obj.name}`);
      
      productImagePublicUrls.push(data.publicUrl);
    }
  });

  return productImagePublicUrls;
}

export {
  getProductImagePublicUrls,
  getPublicUrl,
}