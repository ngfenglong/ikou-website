import { Link } from 'react-router-dom';
import { Review } from '../../model/place';
import ReviewSection from './ReviewSection';
import ReviewSummary from './ReviewSummary';

const ReviewContainer = ({ reviews }: PropsType) => {
  return (
    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
      <ReviewSummary reviews={reviews} />

      {/* Hide it if user has already made the review for this place 
            Else create a modal for review
        */}
      <div className="mt-4 mb-8">
        <Link
          to="./"
          className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
        >
          Write a review
        </Link>
      </div>

      <ReviewSection reviews={reviews} />
    </div>
  );
};

type PropsType = {
  reviews: Review[];
  addReviewClick: () => void;
};

export default ReviewContainer;
