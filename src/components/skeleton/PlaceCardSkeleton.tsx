const PlaceCardSkeleton = () => {
  return (
    <div className="animate-pulse shadow rounded-md h-96 w-full mx-auto">
      
      <div className="h-72 w-72 bg-gray-300 rounded" />

      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>

      <div className="mt-6">
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default PlaceCardSkeleton;
