import TripCard from "./TripCard";

const TripContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((listing) => (
        <TripCard key={listing} />
      ))}
    </div>
  );
};
export default TripContainer;
