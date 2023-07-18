import { MapPinIcon, StarIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { Review } from '../../model/place';

const PlaceCard = ({
  imageUrl = '/images/no-image.jpg',
  name,
  description = '',
  category,
  rating = 4,
  like,
  id,
  area,
  average_spending,
  reviews,
}: PropsType) => {
  return (
    <div key={id}>
      <Link to={`/places/${id}`} className="group">
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative mt-4">
            <div className="flex flex-row justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {name.length > 30 ? name.substring(0, 27) + '...' : name}
              </h3>
              {reviews.length > 0 && (
                <div className="flex flex-row items-center">
                  <StarIcon
                    className={`h-4 w-4 flex-shrink-0 text-indigo-300`}
                    aria-hidden="true"
                  />
                  <p className="ml-1 text-sm text-gray-500">{reviews.length}</p>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {description.length > 30
                ? description?.substring(0, 30) + '...'
                : description}
            </p>
            <div className="mt-2 flex flex-row items-center">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm text-gray-500 ml-1">{area}</span>
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
  category?: string;
  rating?: number;
  like?: boolean;
  area: string;
  average_spending?: number;
  reviews: Review[];
};

export default PlaceCard;
