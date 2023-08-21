import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RoundedBadge from '../../components/badges/RoundedBadge';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import { Place } from '../../model/place';
import { getPlaceById } from '../../services/place-service';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import NotFoundContainer from '../../components/container/NotFoundContainer';

const onAddReview = () => {};

const ViewPlaceDetailPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [hasError, setHasError] = useState<Boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) {
      getPlaceById(id)
        .then((data) => {
          setPlace(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setHasError(true);
          setIsLoading(false);
        });
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [id]);

  const onBackClick = () => {
    navigate(-1);
  };

  if (hasError) {
    return (
      <NotFoundContainer>
        <p className="text-base font-semibold leading-8 text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Place not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn't find the palce you're looking for.
        </p>
        <div className="mt-10">
          <Link
            to="/#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </NotFoundContainer>
    );
  }

  return (
    <div className="bg-slate">
      <div className="mx-auto py-4 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:mb-12 md:mb-8 mb-4">
          <button
            className="flex flex-row gap-2 items-center text-gray-500 hover:text-indigo-600"
            onClick={onBackClick}
          >
            <ArrowLeftIcon
              className="h-5 w-5 flex-shrink-0 hover:text-indigo-600"
              aria-hidden="true"
            />
            <span className="align-text-top">Back</span>
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              {isLoading || !place ? (
                <div className="animate-pulse h-96 w-full shadow bg-gray-300"></div>
              ) : (
                <img
                  src={place.image_url}
                  alt={place.placeName}
                  className="object-cover object-center"
                />
              )}
            </div>
          </div>

          <div className="mt-14 max-w-2xl sm:mt-8 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4"></div>
              <div className="mt-4">
                {isLoading || !place ? (
                  <>
                    <div className="animate-pulse h-10 bg-gray-300 rounded w-3/4"></div>
                    <div className="animate-pulse mt-2 h-7 bg-gray-300 rounded w-1/4"></div>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {place.placeName}
                    </h1>
                    <RoundedBadge classNames="mt-2 text-gray-500" color="gray">
                      {place.category}
                    </RoundedBadge>
                  </>
                )}
              </div>
            </div>

            {isLoading || !place ? (
              <div className="animate-pulse mt-6 h-48 bg-gray-300 rounded w-full"></div>
            ) : (
              <p className="mt-6 text-gray-500">{place.description}</p>
            )}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {isLoading ? (
                <div className="animate-pulse h-12 bg-gray-300 rounded flex w-full items-center justify-center py-3 px-8 "></div>
              ) : (
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Create Activity
                </button>
              )}
              {isLoading ? (
                <div className="animate-pulse h-12 bg-gray-300 rounded flex w-full items-center justify-center py-3 px-8 "></div>
              ) : (
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to MyList
                </button>
              )}
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              {isLoading || !place ? (
                <div className="animate-pulse h-48 w-full shadow bg-gray-300"></div>
              ) : (
                <>
                  <h3 className="text-sm font-medium text-gray-900">
                    Operating Hours
                  </h3>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    {place.operating_hours}
                  </div>
                </>
              )}
            </div>
          </div>
          {isLoading || !place ? (
            <div className="animate-pulse h-72 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none shadow bg-gray-300"></div>
          ) : (
            <ReviewContainer
              reviews={place.reviews}
              addReviewClick={onAddReview}
            ></ReviewContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPlaceDetailPage;
