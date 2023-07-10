interface I_ProductPriceTableRecord {
  id: number,
  created_at: string,
  stripe_price_id: string,
  product_id: number,
  price: number,
  quantity: number,
}

export default I_ProductPriceTableRecord;