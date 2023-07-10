// interfaces
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
import type I_ProductRatingTableRecord from '$interfaces/I_ProductRatingTableRecord'

interface I_Product extends I_ProductTableRecord {
  prices: I_ProductPriceTableRecord[],
  ratings?: I_ProductRatingTableRecord[],
}

export default I_Product;