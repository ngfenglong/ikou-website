import CategoryButton from '../../components/button/CategoryButton';
import Container from '../../components/container/Container';
import SubHeader from '../../components/heading/SubHeading';
import { CATEGORIES } from '../../dummy_data/codestable';
import PlaceCard from '../../components/card/PlaceCard';

const CategoryMenu = (props: {
  categoriesList: string[];
  onSelect: (category: string) => void;
}) => {
  return (
    <ul className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-sm mb-10 sm:grid-cols-3 md:gap-y-6 lg:max-w-none lg:grid-cols-6">
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
  const placeCategories = CATEGORIES;

  const onSelectCategory = (id: string) => {
    console.log('Selected ' + id);
  };

  return (
    <div className="bg-gray-background space-y-8 mt-8">
      <Container>
        <CategoryMenu
          categoriesList={placeCategories}
          onSelect={onSelectCategory}
        />

        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-8">
            <SubHeader subHeader="Top Location for Sports Activites"></SubHeader>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <PlaceCard
                    key={num + ''}
                    name={`Place Name - ${num}`}
                    description={`Description for place - ${num}`}
                  ></PlaceCard>
                ))}
              </div>
            </section>
          </div>
          <div className="flex flex-col space-y-8">
            <SubHeader subHeader="Top Location for Cafes"></SubHeader>
            <section
              aria-labelledby="products-heading"
              className="mx-auto max-w-2xl lg:max-w-7xl "
            >
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <PlaceCard
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
