import { useState, useEffect } from 'react';
import PlaceCard from '../../components/card/PlaceCard';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import { Place } from '../../model/place';
import MainHeading from '../../components/heading/Heading';
import { useSearchParams } from 'react-router-dom';
import PlaceCardSkeleton from '../../components/skeleton/PlaceCardSkeleton';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';
import axios from 'axios';

const ViewSearchPlaceResultPage = () => {
  const [searchParams] = useSearchParams();

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const searchKeyword = searchParams.get('keyword');
    if (searchKeyword !== null) {
      setKeyword(searchKeyword);
      axios
        .post(
          `${process.env.REACT_APP_IKOU_API_BASEURL}/places/searchPlaceByKeyword`,
          {
            keyword: searchKeyword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setPlaces(response.data);
          setIsLoading(false);
        });
    } else {
      setPlaces([]);
      setIsLoading(false);
    }
  }, [searchParams, keyword]);

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
                        imageUrl={place.image_url}
                        reviews={place.reviews}
                        area=''
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
