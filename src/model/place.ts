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

  averageRatings: number;
  reviews: Array<Review>;
}

export interface Review {
  reviewerName:string;
  reviewerImageURL: string;
  reviewDescription: string;
  reviewDate: Date;
  rating: number;
}



              
