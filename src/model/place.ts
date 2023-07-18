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
  id: string;
  rating: number;
  review_description: string;
  reviewer_profile_image: string;
  updated_at: Date;
  reviewer_name: string;
}
