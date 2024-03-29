import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Place } from "../../model/place";
import Container from "../../components/container/Container";
import MainHeading from "../../components/heading/Heading";
import BreadCrumbs from "../../components/breadcrumbs/Breadcrumbs";
import SubHeading from "../../components/heading/SubHeading";
import PlaceCardSkeleton from "../../components/skeleton/PlaceCardSkeleton";
import PlaceCard from "../../components/card/PlaceCard";
import NotFoundContainer from "../../components/container/NotFoundContainer";
import * as ROUTES from "../../constants/routes";
import { getPlacesByCategory } from "../../services/place-service";

const ViewPlacesByCategoryPage = () => {
  const location = useLocation();
  const pathName: string = location.pathname;

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");

  const onUpdateLikeStatus = (placeId: string) => {
    const selectedPlace = places.find((place) => place.id === placeId);

    if (selectedPlace) {
      selectedPlace.liked = !selectedPlace.liked;
      setPlaces((prev) => [...prev]);
    }
  };

  useEffect(() => {
    const pathStrArr = pathName.split("/");

    if (pathStrArr[1].toLowerCase() === "category" && !!pathStrArr[2]) {
      setCategory(pathStrArr[2]);
      getPlacesByCategory(pathStrArr[2]).then((places: Place[]) => {
        setPlaces(places ?? []);
        setIsLoading(false);
      });
    }
  }, [pathName]);

  if (isLoading === false && places.length === 0) {
    return (
      <NotFoundContainer>
        <h1 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl">
          No Places Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We currently don&apos;t have any places listed under this category.
          <br />
          Help us build our list! Suggest a spot, and after review by our admin,
          it might be added here.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={ROUTES.ADD_PLACES}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add a New Place
          </Link>
        </div>
      </NotFoundContainer>
    );
  }

  return (
    <div className="bg-gray-background space-y-8 mt-8">
      <Container>
        <div className="flex flex-col space-y-8">
          <MainHeading>Explore {category}</MainHeading>
          <BreadCrumbs
            pages={[
              {
                name: category,
                href: `/category/${category}`,
              },
            ]}
          ></BreadCrumbs>
          <div className="flex flex-col space-y-4">
            <SubHeading>Discover places in your chosen category.</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-screen-2xl"
            >
              <div className="mx-auto grid max-w-screen-2xl gap-12 text-sm mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                {isLoading
                  ? Array(12)
                      .fill(0)
                      .map((_, index) => <PlaceCardSkeleton key={index} />)
                  : places?.map((place) => (
                      <PlaceCard
                        id={place.id}
                        key={place.id}
                        name={place.placeName}
                        description={place.description.substring(0, 30) + "..."}
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
        </div>
      </Container>
    </div>
  );
};

export default ViewPlacesByCategoryPage;
