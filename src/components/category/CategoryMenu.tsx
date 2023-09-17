import CategoryButton from "../button/CategoryButton";

const CategoryMenu = (props: {
  categoriesList: string[];
  onSelect: (category: string) => void;
}) => {
  return (
    <ul className="mx-auto max-w-screen-2xl pt-4 flex flex-row items-center justify-between overflow-x-auto">
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

export default CategoryMenu;
