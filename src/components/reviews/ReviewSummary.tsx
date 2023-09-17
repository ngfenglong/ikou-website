import { StarIcon } from "@heroicons/react/20/solid";
import { Review } from "../../model/place";

const ReviewSummary = ({ reviews = [] }: ReviewSummaryPropsType) => {
  const averageRatings: number =
    reviews?.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / reviews?.length;

  const ratingCounts: {
    rating: number;
    reviews: Review[];
  }[] = [5, 4, 3, 2, 1].map((r) => {
    return {
      rating: r,
      reviews: reviews.filter((review) => {
        return review.rating >= r && review.rating < r + 1;
      }),
    };
  });

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Ratings
      </h2>

      <div className="mt-3 flex items-center">
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-5 w-5 flex-shrink-0 ${
                  averageRatings > rating ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <p className="ml-2 text-sm text-gray-900">
          Based on {reviews.length} reviews
        </p>
      </div>

      <div className="mt-6">
        <dl className="space-y-3">
          {ratingCounts.map((count) => (
            <div key={count.rating} className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-gray-900">{count.rating}</p>
                <div
                  aria-hidden="true"
                  className="ml-1 flex flex-1 items-center"
                >
                  <StarIcon
                    className={`h-5 w-5 flex-shrink-0 ${
                      count.rating > 0 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    {count.rating > 0 ? (
                      <div
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                        style={{
                          width: `calc(${count.reviews.length} / ${
                            reviews.length > 0 ? reviews.length : 1
                          } * 100%)`,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                {Math.round(
                  (count.reviews.length /
                    (reviews.length > 0 ? reviews.length : 1)) *
                    100,
                )}
                %
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};

type ReviewSummaryPropsType = {
  reviews: Review[];
};

export default ReviewSummary;
