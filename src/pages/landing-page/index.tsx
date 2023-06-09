import CategoryButton from '../../components/button/CategoryButton';
import Container from '../../components/container/Container';
import SubHeading from '../../components/heading/SubHeading';
import PlaceCard from '../../components/card/PlaceCard';
import { useEffect, useState } from 'react';
import { Place } from '../../model/place';
import { CodeDecodeCategory } from '../../model/code-decode-models';
import { useNavigate } from 'react-router-dom';

const CategoryMenu = (props: {
  categoriesList: string[];
  onSelect: (category: string) => void;
}) => {
  return (
    <ul className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-sm mt-5 mb-5 sm:grid-cols-4 md:gap-y-8 lg:max-w-none lg:grid-cols-8">
      {props.categoriesList.map((category, key) => (
        <CategoryButton
          key={key}
          categoryName={category}
          onSelectCategory={() => props.onSelect(category)}
        />
      ))}
    </ul>
  );
};

const LandingPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [recommendedCafes, setRecommededCafes] = useState<Place[]>([]);  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/common/codeDecodeCategories`
    )
      .then((response) => {
        if (response.status !== 200) {
          // error handling
        }
        return response.json();
      })
      .then((categories) => {
        setCategories(
          (categories as CodeDecodeCategory[]).map(
            (category) => category.decode
          )
        );
      });

    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/places`)
      .then((response) => {
        if (response.status !== 200) {
          // error handling
        }
        return response.json();
      })
      .then((places) => {
        setRecommededCafes(places);
      });
  }, []);

  const onSelectCategory = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="bg-gray-background space-y-8 mt-8">
      <Container>
        <CategoryMenu categoriesList={categories} onSelect={onSelectCategory} />

        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-8">
            <SubHeading>Top Location for Cafes</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {recommendedCafes.map((place) => (
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
          <div className="flex flex-col space-y-8">
            <SubHeading>Top Location for Sports Activites</SubHeading>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <PlaceCard
                    id={num + ''}
                    key={num + ''}
                    name={`Place Name - ${num}`}
                    description={`Description for place - ${num}`}
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
