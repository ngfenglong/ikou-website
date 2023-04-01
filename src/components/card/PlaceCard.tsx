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
    <a href={`/places/${id}`} className="group">
      <div key={id}>
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
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
          </div>
        </div>
        <div className="mt-6">
          <a
            href={`/activity/${id}`}
            className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >
            Create Activitiy
          </a>
        </div>
      </div>
    </a>
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
