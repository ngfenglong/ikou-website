export interface Place {
  placeId: string;
  placeName: string;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  operatingHours: string;
  cuisine: string;
  avgSpending: number;

  features: Array<string>;
  placeType: string;

  ratings: number;
  reviews: Array<Review>;
}

export interface Review {
  reviewId: string;
  reviewDescription: string;
}
