const PlaceCard = ({
  imageUrl = '/images/no-image.jpg',
  name,
  description,
  category,
  rating,
  like,
  key,
}: PropsType) => {
  return (
    <a key={key} href={'/#'} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={imageUrl}
          alt={`${key}_${name}`}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{description}</p>
    </a>
  );
};

type PropsType = {
  imageUrl?: string;
  name?: string;
  description?: string;
  category?: string;
  rating?: number;
  like?: boolean;
  key: string;
};

export default PlaceCard;
