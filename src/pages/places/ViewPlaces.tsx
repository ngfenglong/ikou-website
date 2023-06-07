import { useState, useEffect } from 'react';
import PlaceCard from '../../components/card/PlaceCard';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import { Place } from '../../model/place';
import MainHeading from '../../components/heading/Heading';
import { useLocation } from 'react-router-dom';

const ViewPlacesPage = () => {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const location = useLocation();
  const pathName: string = location.pathname;

  // Subheader for view by category "Welcome to 'CategoryName': Your Adventure Starts Here"
  // When filters are applied: "Showing 'filtered' Places"

  useEffect(() => {
    const pathStrArr = pathName.split('/');

    if (pathStrArr[1].toLowerCase() === 'category') {
      const selectedCategory = pathStrArr[2];
      if (!selectedCategory) {
        // throw error
      }
      // Get category -> pathStrArr[1]
      // throw error if category doesnt exists
      // Change into API that retrieve places by category
      fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`)
        .then((response) => {
          if (response.status !== 200) {
          }
          return response.json();
        })
        .then((places: Place[]) => {
          console.log(places.map((place) => place.category));
          setPlaces(
            places.filter(
              (place) =>
                place.category.toLowerCase() === selectedCategory.toLowerCase()
            )
          );
        });
    } else {
      fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`)
        .then((response) => {
          if (response.status !== 200) {
          }
          return response.json();
        })
        .then((places) => {
          console.log(places);
          setPlaces(places);
        });
    }
  }, [pathName]);

  if (!places) {
    // Create skeleton
  } else if (places.length === 0) {
    // Display text
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
