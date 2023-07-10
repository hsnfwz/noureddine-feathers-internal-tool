interface I_ProductTableRecord {
  id: number,
  created_at: string,
  stripe_product_id: string,
  name: string,
  description: string,
  size: number,
  size_unit: string,
  color: string,
  is_hidden: boolean,
  rating_average: number,
  rating_count: number,
}

export default I_ProductTableRecord;