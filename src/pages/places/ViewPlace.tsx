import RoundedBadge from '../../components/badges/RoundedBadge';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import { Place, Review } from '../../model/place';

const DUMMY_REVIEWS: Review[] = [
  {
    reviewerName: 'Hector Gibbons',
    reviewerImageURL: '/images/profile.jpeg',
    reviewDate: new Date(2023, 3, 1, 14, 32, 0),
    rating: 5,
    reviewDescription: 'The food is very nice',
  },
  {
    reviewerName: 'Blake Reid',
    reviewerImageURL: '/images/profile.jpeg',
    reviewDate: new Date(2022, 8, 2, 15, 4, 0),
    rating: 4.5,
    reviewDescription: 'The ambience is good, nice music.',
  },
  {
    reviewerName: 'Ben Russel',
    reviewerImageURL: '/images/profile.jpeg',
    reviewDate: new Date(2022, 7, 12, 11, 24, 0),
    rating: 3,
    reviewDescription:
      'The coffee there is exactly something I am looking for.',
  },
  {
    reviewerName: 'Mark Edwards',
    reviewerImageURL: '/images/profile.jpeg',
    reviewDate: new Date(2022, 5, 15, 10, 30, 0),
    rating: 4,
    reviewDescription: 'Chill location',
  },
];

const DUMMY_PLACE: Place = {
  placeId: '123',
  placeName: 'Happy Cafe 123',
  imageUrl: 'https://media.timeout.com/images/105892082/1920/1080/image.jpg',
  shortDescription: 'Enjoy Delicious Western Cuisine at Our Cafe!',
  longDescription:
    'Welcome to our cozy Western cafe where we serve up mouth-watering dishes with a home-cooked feel. Our menu includes a wide variety of dishes such as juicy burgers, crispy fries, fresh salads, and hearty sandwiches. Our chefs use only the freshest ingredients to create delicious meals that will satisfy your cravings. Our cafe has a warm and inviting atmosphere, perfect for a casual lunch with friends or a romantic dinner with your loved one. Come in and experience our friendly service and delicious food today!',
  operatingHours:
    'We are open from Monday to Friday, from 8 am to 9 pm, and on weekends from 9 am to 10 pm. We also offer takeout and delivery services for your convenience.',
  cuisine: 'Western',
  avgSpending: 12,

  features: [],
  placeType: 'Food',

  averageRatings: 4,
  reviews: DUMMY_REVIEWS,
};

const onAddReview = () => {
  console.log('Review Added!');
};

const ViewPlacePage = () => {
  return (
    <div className="bg-slate">
      <div className="mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={DUMMY_PLACE.imageUrl}
                alt={DUMMY_PLACE.placeName}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-8 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4"></div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {DUMMY_PLACE.placeName}
                </h1>

                <RoundedBadge classNames="mt-2 text-gray-500" color="gray">
                  {DUMMY_PLACE.placeType}
                </RoundedBadge>

                {/* <p className="mt-2 text-sm text-gray-500">
                  {DUMMY_PLACE.placeType}
                </p> */}
              </div>
            </div>

            <p className="mt-6 text-gray-500">{DUMMY_PLACE.longDescription}</p>

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
                {DUMMY_PLACE.operatingHours}
              </div>
            </div>
          </div>
          <ReviewContainer
            reviews={DUMMY_PLACE.reviews}
            addReviewClick={onAddReview}
          ></ReviewContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewPlacePage;
