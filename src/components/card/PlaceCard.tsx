import { MapPinIcon, StarIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const onLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="col-span-1 cursor-pointer group" key={id}>
      <div
        onClick={() => {
          navigate(`/places/${id}`);
        }}
        className="group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="relative h-80 w-80 lg:h-64 lg:w-64 md:h-56 md:w-56 overflow-hidden rounded-lg group-hover:scale-105 ">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
            <button
              onClick={onLikeClick}
              className="absolute bottom-0 right-0 mb-4 mr-4 z-10"
            >
              <div className="text-slate-100 bg-slate-900 bg-opacity-60 rounded-full">
                <span className="sr-only">Like</span>
                <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                  <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                </svg>
              </div>
            </button>
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
      </div>
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
