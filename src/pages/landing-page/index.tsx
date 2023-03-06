import CategoryButton from '../../components/button/CategoryButton';
import Container from '../../components/container/Container';
import SubHeader from '../../components/heading/SubHeading';
import Header from '../../components/header/header';
import { CATEGORIES } from '../../dummy_data/codestable';
import Footer from '../../components/footer/Footer';

const CategoryMenu = (props: {
  categoriesList: string[];
  onSelect: (category: string) => void;
}) => {
  return (
    <ul
      // role="list"
      className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-sm mb-10 sm:grid-cols-3 md:gap-y-6 lg:max-w-none lg:grid-cols-6"
    >
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
    <div className="bg-gray-background">
      <Header />
      <Container>
        <CategoryMenu
          categoriesList={placeCategories}
          onSelect={onSelectCategory}
        />

        <div className="flex flex-col space-y-16">
          <SubHeader subHeader="Top Location for Sports Activites"></SubHeader>

          <div>
            <SubHeader subHeader="Top Location for Cafes"></SubHeader>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
export default LandingPage;
