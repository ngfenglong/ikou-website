const CategoryCard: React.FC<Props> = (props) => {
  return (
    <div
      className="flex py-8 px-12 mb-12 bg-gray-50 w-52 h-24 border-gray-100 items-center cursor-pointer shadow-md rounded-md hover:bg-blue-primary"
      onClick={() => props.onSelectCategory(props.categoryName)}
    >
      <h3 className="text-lg leading-normal font-semibold text-black">
        {props.categoryName}
      </h3>
    </div>
  );
};

type Props = {
  categoryName: string;
  onSelectCategory: (key: string) => void;
};

export default CategoryCard;
