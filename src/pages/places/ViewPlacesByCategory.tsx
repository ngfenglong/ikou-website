import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Place } from '../../model/place';
import Container from '../../components/container/Container';
import MainHeading from '../../components/heading/Heading';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';
import SubHeading from '../../components/heading/SubHeading';
import PlaceCardSkeleton from '../../components/skeleton/PlaceCardSkeleton';
import PlaceCard from '../../components/card/PlaceCard';

const ViewPlacesByCategoryPage = () => {
  const location = useLocation();
  const pathName: string = location.pathname;

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const pathStrArr = pathName.split('/');

    if (pathStrArr[1].toLowerCase() === 'category') {
      setCategory(pathStrArr[2]);
      fetch(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlacesByCategory/${category}`
      )
        .then((response) => {
          if (response.status !== 200) {
          }
          return response.json();
        })
        .then((places: Place[]) => {
          setPlaces(places ?? []);
          setIsLoading(false);
        });
    }
  }, [pathName, category]);

  if (isLoading === false && places.length === 0) {
    return (
      <Container>
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-8">No place</div>
        </div>
      </Container>
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
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {isLoading
                  ? Array(12)
                      .fill(0)
                      .map((_, index) => <PlaceCardSkeleton key={index} />)
                  : places?.map((place) => (
                      <PlaceCard
                        id={place.id}
                        key={place.id}
                        name={place.placeName}
                        description={place.description.substring(0, 30) + '...'}
                        category={place.category}
                        imageUrl={place.image_url}
                        reviews={place.reviews}
                        average_spending={place.average_spending}
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

export default ViewPlacesByCategoryPage;
