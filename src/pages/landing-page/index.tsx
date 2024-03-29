import Container from "../../components/container/Container";
import SubHeading from "../../components/heading/SubHeading";
import PlaceCard from "../../components/card/PlaceCard";
import { useEffect, useState } from "react";
import { Place } from "../../model/place";
import { CodeDecodeOption } from "../../model/common";
import { useNavigate } from "react-router-dom";
import PlaceCardSkeleton from "../../components/skeleton/PlaceCardSkeleton";
import CategoryMenu from "../../components/category/CategoryMenu";
import { getCategories } from "../../services/codestable-service";
import { getAllPlaces } from "../../services/place-service";
import ServerErrorBanner from "../../components/error-banner/ServerErrorBanner";

const LandingPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [recommendedCafes, setRecommededCafes] = useState<Place[]>([]);
  const navigate = useNavigate();

  const onUpdateLikeStatus = (placeId: string) => {
    const selectedPlace = recommendedCafes.find(
      (place) => place.id === placeId,
    );

    if (selectedPlace) {
      selectedPlace.liked = !selectedPlace.liked;
      setRecommededCafes((prev) => [...prev]);
    }
  };

  useEffect(() => {
    Promise.all([getCategories(), getAllPlaces()])
      .then(([categories, places]) => {
        setCategories(
          (categories as CodeDecodeOption[])
            .map((category) => category.decode)
            .sort(),
        );
        setRecommededCafes(places);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSelectCategory = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  if (hasError) {
    return <ServerErrorBanner />;
  }
  return (
    <div className="bg-gray-background space-y-8 mt-1">
      <Container>
        {isLoading ? (
          <ul className="mx-auto max-w-screen-2xl pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {new Array(16).fill(0).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-12 w-12 shadow bg-gray-300"
              ></div>
            ))}
          </ul>
        ) : (
          <CategoryMenu
            categoriesList={categories}
            onSelect={onSelectCategory}
          />
        )}

        <div className="flex flex-col space-y-16 mt-4">
          <div className="flex flex-col space-y-2">
            <SubHeading>Top Location for Cafes</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-screen-2xl "
            >
              <div className="mx-auto grid max-w-screen-2xl gap-12 text-sm mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                {isLoading
                  ? Array(12)
                      .fill(0)
                      .map((_, index) => <PlaceCardSkeleton key={index} />)
                  : recommendedCafes.map((place) => (
                      <PlaceCard
                        id={place.id}
                        key={place.id}
                        name={place.placeName}
                        description={place.description}
                        imageUrl={place.image_url}
                        reviews={place.reviews}
                        area={place.area}
                        rating={place.average_rating}
                        liked={place.liked}
                        updateLikeStatus={onUpdateLikeStatus}
                      ></PlaceCard>
                    ))}
              </div>
            </section>
          </div>
          <div className="flex flex-col space-y-2">
            <SubHeading>Top Location for Sports Activites</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-screen-2xl "
            >
              <div className="mx-auto grid max-w-screen-2xl gap-12 text-sm mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                {isLoading
                  ? new Array(12)
                      .fill(0)
                      .map((_, i) => <PlaceCardSkeleton key={i} />)
                  : [1, 2, 3, 4, 5, 6].map((num) => (
                      <PlaceCard
                        id={num + ""}
                        key={num + ""}
                        name={`Place Name - ${num}`}
                        description={`Description for place - ${num}`}
                        reviews={[]}
                        area=""
                        updateLikeStatus={onUpdateLikeStatus}
                      ></PlaceCard>
                    ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
