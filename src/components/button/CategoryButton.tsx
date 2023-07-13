import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faPersonHiking,
  faPersonRunning,
  faBagShopping,
  faMasksTheater,
  faPlaneDeparture,
  faChampagneGlasses,
  faChildren,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

// Create a mapping
const iconMap: { [key: string]: IconDefinition } = {
  Food: faUtensils,
  'Tourist Attractions': faPlaneDeparture,
  Shopping: faBagShopping,
  Outdoor: faPersonHiking,
  Nightlife: faChampagneGlasses,
  'Arts & Culture': faMasksTheater,
  Sports: faPersonRunning,
  Romance: faChildren,
};

const CategoryButton = ({
  categoryName,
  // categoryIcon,
  onSelectCategory,
}: PropsType) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => onSelectCategory(categoryName)}
    >
      <FontAwesomeIcon
        size="xl"
        onClick={() => onSelectCategory(categoryName)}
        icon={iconMap[categoryName]}
      />
      <span className="mx-auto my-2 text-xs  font-helvetica">{categoryName}</span>
    </div>
  );
};

type PropsType = {
  categoryName: string;
  // categoryIcon: string;
  onSelectCategory: (key: string) => void;
};

export default CategoryButton;
