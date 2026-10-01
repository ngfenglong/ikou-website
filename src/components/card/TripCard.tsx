const TripCard = () => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src="/images/no-image.jpg" alt="Trip listing" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Beautiful Country Listing</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vel sapien et lacus sodales gravida. Vestibulum euismod massa nec orci
          malesuada interdum. Proin sit amet metus vitae quam fringilla sagittis
          non vel orci.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #Japan
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #vacation
        </span>
      </div>
    </div>
  );
};

export default TripCard;
