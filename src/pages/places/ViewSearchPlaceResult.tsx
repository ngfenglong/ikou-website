import { useState, useEffect } from 'react';
import PlaceCard from '../../components/card/PlaceCard';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import { Place } from '../../model/place';
import MainHeading from '../../components/heading/Heading';
import { Link, useSearchParams } from 'react-router-dom';
import PlaceCardSkeleton from '../../components/skeleton/PlaceCardSkeleton';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';
import NotFoundContainer from '../../components/container/NotFoundContainer';
import { getPlacesKeyword } from '../../services/place-service';

const ViewSearchPlaceResultPage = () => {
  const [searchParams] = useSearchParams();

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const searchKeyword = searchParams.get('keyword');
    if (searchKeyword !== null) {
      setKeyword(searchKeyword);
      getPlacesKeyword(searchKeyword).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    } else {
      setPlaces([]);
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading === false && places.length === 0) {
    return (
      <NotFoundContainer>
        <h1 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl">
          No Result Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Please try again with different keywords or consider using a more
          generic term.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </NotFoundContainer>
    );
  }
  return (
    <div className="bg-gray-background space-y-8 mt-8">
      <Container>
        <div className="flex flex-col space-y-8">
          <BreadCrumbs
            pages={[
              {
                name: 'Search Results',
                href: '',
              },
            ]}
          ></BreadCrumbs>
          <div className="flex flex-col space-y-4">
            <MainHeading>Search Results for {keyword}</MainHeading>
            <SubHeading>Showing all places matching your search.</SubHeading>
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
                        description={place.description.substring(0, 30) + '...'}
                        imageUrl={place.image_url}
                        reviews={place.reviews}
                        area={place.area}
                        rating={place.average_rating}
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

export default ViewSearchPlaceResultPage;
