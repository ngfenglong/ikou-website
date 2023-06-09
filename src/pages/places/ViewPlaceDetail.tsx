import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RoundedBadge from '../../components/badges/RoundedBadge';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import { Place } from '../../model/place';

const onAddReview = () => {
  console.log('Review Added!');
};

const ViewPlaceDetailPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlaceById/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          // let err = Error;
          // err.message = 'Invalid response code: ' + response.status;
          // setState({ error: err });
          return null;
        }
        return response.json();
      })
      .then((place) => {
        setPlace(place);
        // setIsLoaded(true);
        console.log('place', place);
      });
  }, [id]);

  if (!place) {
    console.log(place);
    return <div>No place</div>;
  }
  return (
    <div className="bg-slate">
      <div className="mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={place.image_url}
                alt={place.placeName}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-8 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4"></div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {place.placeName}
                </h1>
                <RoundedBadge classNames="mt-2 text-gray-500" color="gray">
                  {place.category}
                </RoundedBadge>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{place.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Create Activity
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add to MyList
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Operating Hours
              </h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                {place.operating_hours}
              </div>
            </div>
          </div>
          <ReviewContainer
            reviews={place.reviews}
            addReviewClick={onAddReview}
          ></ReviewContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewPlaceDetailPage;
