interface I_ProductRatingTableRecord {
  id: number,
  created_at: string,
  product_id: number,
  profile_id: number,
  rating: number,
  review: string,
}

export default I_ProductRatingTableRecord;