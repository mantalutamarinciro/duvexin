// Never substitute invented review statistics when Google data is unavailable.
export function reviewSummary(rating: unknown, count: unknown) {
  if (typeof rating !== 'number' || !Number.isFinite(rating) || rating < 1 || rating > 5 ||
      typeof count !== 'number' || !Number.isSafeInteger(count) || count <= 0) {
    return null;
  }
  return { ratingValue: Number(rating.toFixed(1)), reviewCount: count };
}
