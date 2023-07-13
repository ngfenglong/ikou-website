import { Link } from 'react-router-dom';

const PlaceCard = ({
  imageUrl = '/images/no-image.jpg',
  name,
  description = '',
  category,
  rating,
  like,
  id,
}: PropsType) => {
  return (
    <div key={id}>
      <Link to={`/places/${id}`} className="group">
        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative mt-4">
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {description.length > 30
                ? description?.substring(0, 30) + '...'
                : description}
            </p>
          </div>
        </div>
      </Link>
      <div className="mt-6">
        <Link
          to={`/activity/${id}`}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
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
  name?: string;
  description?: string;
  category?: string;
  rating?: number;
  like?: boolean;
};

export default PlaceCard;
