import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import PlaceCard from '../../components/card/PlaceCard';
import { useEffect, useState } from 'react';
import { Place } from '../../model/place';
import { CodeDecodeCategory } from '../../model/code-decode-models';
import { useNavigate } from 'react-router-dom';
import PlaceCardSkeleton from '../../components/skeleton/PlaceCardSkeleton';
import CategoryMenu from '../../components/category/CategoryMenu';

const LandingPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [recommendedCafes, setRecommededCafes] = useState<Place[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/common/codeDecodeCategories`
      ),
      fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`),
    ])
      .then(async ([categoriesResponse, placesResponse]) => {
        if (
          categoriesResponse.status !== 200 ||
          placesResponse.status !== 200
        ) {
          //redirect to error page
        }
        const categories = await categoriesResponse.json();
        const places = await placesResponse.json();
        return [categories, places];
      })
      .then(([categories, places]) => {
        setCategories(
          (categories as CodeDecodeCategory[])
            .map((category) => category.decode)
            .sort()
        );
        setRecommededCafes(places);
      })
      .catch((err) => {
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
    return (
      <Container>
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Oops!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            There seems to be a problem with our server. We're working hard to
            fix it. In the meantime, please try again later.
          </p>
        </div>
      </Container>
    );
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
              <div className="mx-auto grid max-w-screen-2xl gap-16 text-sm mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
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
              <div className="mx-auto grid max-w-screen-2xl gap-16 text-sm mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                {isLoading
                  ? new Array(12)
                      .fill(0)
                      .map((_, i) => <PlaceCardSkeleton key={i} />)
                  : [1, 2, 3, 4, 5, 6].map((num) => (
                      <PlaceCard
                        id={num + ''}
                        key={num + ''}
                        name={`Place Name - ${num}`}
                        description={`Description for place - ${num}`}
                        reviews={[]}
                        area=""
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
