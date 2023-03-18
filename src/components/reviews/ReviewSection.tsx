import { StarIcon } from '@heroicons/react/20/solid';
import { Review } from '../../model/place';
import { formattedDateToString } from '../../utils/date-helper';
import SubHeading from '../heading/SubHeading';

const IndividualReview = ({ review, id }: ReviewPropsType) => {
  return (
    <div key={id} className="flex space-x-4 text-sm text-gray-500">
      <div className="flex-none py-8">
        <img
          src={review.reviewerImageURL}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-100"
        />
      </div>
      <div className={`py-8 ${id === 0 ? '' : 'border-t border-gray-200'}`}>
        <h3 className="font-medium text-gray-900">{review.reviewerName}</h3>
        <p>{formattedDateToString(review.reviewDate)}</p>

        <div className="mt-4 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={`'h-5 w-5 flex-shrink-0' ${
                review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <div
          className="prose prose-sm mt-4 max-w-none text-gray-500"
          dangerouslySetInnerHTML={{
            __html: review.reviewDescription,
          }}
        />
      </div>
    </div>
  );
};

const ReviewSection = ({ reviews }: ReviewSectionPropsType) => {
  return (
    <>
      <div className="border-b border-gray-200">
        <SubHeading> Reviews ({reviews.length.toString()})</SubHeading>
      </div>
      {reviews.map((review, reviewIdx) => (
        <IndividualReview review={review} id={reviewIdx} />
      ))}
    </>
  );
};

type ReviewPropsType = {
  review: Review;
  id: number;
};

type ReviewSectionPropsType = {
  reviews: Review[];
};

export default ReviewSection;
