import { useState, useEffect } from 'react';
import PlaceCard from '../../components/card/PlaceCard';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import { Place } from '../../model/place';
import MainHeading from '../../components/heading/Heading';
import PlaceCardSkeleton from '../../components/skeleton/PlaceCardSkeleton';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';

const ViewAllPlacesPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`)
      .then((response) => {
        if (response.status !== 200) {
        }
        return response.json();
      })
      .then((places) => {
        setPlaces(places);
        setIsLoading(false);
      });
  }, []);

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
                name: 'All Places',
                href: '',
              },
            ]}
          ></BreadCrumbs>
          <div className="flex flex-col space-y-4">
            <MainHeading>All Places</MainHeading>
            <SubHeading>Browse and discover all available places.</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-screen-2xl "
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
                        rating={place.average_rating}
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

export default ViewAllPlacesPage;
