import { useState, useEffect } from 'react';
import PlaceCard from '../../components/card/PlaceCard';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import { Place } from '../../model/place';
import MainHeading from '../../components/heading/Heading';
import { useLocation, useSearchParams } from 'react-router-dom';

const ViewPlacesPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathName: string = location.pathname;

  const [places, setPlaces] = useState<Place[] | null>(null);

  useEffect(() => {
    const pathStrArr = pathName.split('/');

    if (pathStrArr[1].toLowerCase() === 'category') {
      const selectedCategory = pathStrArr[2];
      if (!selectedCategory) {
        // throw error
      }
      fetch(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlacesByCategory/${selectedCategory}`
      )
        .then((response) => {
          if (response.status !== 200) {
          }
          return response.json();
        })
        .then((places: Place[]) => {
          setPlaces(places ?? []);
        });
    } else if (!!searchParams.get('Search')) {
      console.log('Searching');
    } else {
      fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`)
        .then((response) => {
          if (response.status !== 200) {
          }
          return response.json();
        })
        .then((places) => {
          setPlaces(places);
        });
    }
  }, [pathName, searchParams]);

  if (!places) {
    return (
      <Container>
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-8">It is null</div>
        </div>
      </Container>
    );
  } else if (places.length === 0) {
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
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-8">
            <MainHeading>Explore Places</MainHeading>
            <SubHeading>
              Your Next Favorite Place Awaits: Start Exploring Now
            </SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {places?.map((place) => (
                  <PlaceCard
                    id={place.id}
                    key={place.id}
                    name={place.placeName}
                    description={place.description.substring(0, 30) + '...'}
                    category={place.category}
                    imageUrl={place.image_url}
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

export default ViewPlacesPage;
