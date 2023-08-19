import { MapPinIcon, StarIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { Review } from '../../model/place';

const PlaceCard = ({
  imageUrl = '/images/no-image.jpg',
  name,
  description = '',
  rating,
  like,
  id,
  area,
  reviews,
}: PropsType) => {
  console.log(name, rating, reviews);
  return (
    <div className="col-span-1 cursor-pointer group" key={id}>
      <Link to={`/places/${id}`} className="group">
        <div className="flex flex-col gap-2 w-full">
          <div className="relative h-80 w-80 lg:h-64 lg:w-64 md:h-56 md:w-56 overflow-hidden rounded-lg group-hover:scale-105 ">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {name.length > 30 ? name.substring(0, 27) + '...' : name}
              </h3>
              {reviews && reviews.length > 0 && rating && rating > 0 && (
                <div className="flex flex-row items-center">
                  <StarIcon
                    className={`h-4 w-4 flex-shrink-0 text-indigo-300`}
                    aria-hidden="true"
                  />
                  <p className="ml-1 text-sm text-gray-500">{rating}</p>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {description.length > 30
                ? description?.substring(0, 30) + '...'
                : description}
            </p>
            <div className="mt-2 flex flex-row items-center">
              <MapPinIcon
                className="h-4 w-4 text-indigo-300"
                aria-hidden="true"
              />
              <span className="text-sm text-gray-400 ml-1">{area}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <Link
          to={`/activity/${id}`}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-indigo-100"
        >
          Create Activitiy
        </Link>
      </div>
    </div>
  );
};

type PropsType = {
  id: string;
  imageUrl?: string;
  name: string;
  description?: string;
  rating?: number;
  like?: boolean;
  area: string;
  reviews: Review[];
};

export default PlaceCard;
