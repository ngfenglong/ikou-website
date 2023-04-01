export interface Place {
  id: string;
  placeName: string;
  description: string;
  lat: string;
  lon: string;
  average_spending: number;
  image_url: string;
  category: string;
  sub_category: string;

  operating_hours: string;
  features: string[];

  averageRatings: number;
  reviews: Review[];
}

export interface Review {
  reviewer_name: string;
  reviewer_profile_image: string;
  review_description: string;
  updated_at: Date;
  rating: number;
}
