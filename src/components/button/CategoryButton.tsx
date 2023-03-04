import Button from './Button';

const CategoryButton = ({ categoryName, onSelectCategory }: PropsType) => {
  return (
    <Button
      onClick={() => onSelectCategory(categoryName)}
      variant="outline"
      className=''
    >
      <span className="ml-2.5">{categoryName}</span>
    </Button>
  );
};

type PropsType = {
  categoryName: string;
  onSelectCategory: (key: string) => void;
};

export default CategoryButton;
