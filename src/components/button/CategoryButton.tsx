import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faMountain,
  faSpa,
  faUsers,
  faLandmark,
  faUmbrellaBeach,
  faMusic,
  faCalendarAlt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

// Create a mapping
const iconMap: { [key: string]: IconDefinition } = {
  Food: faUtensils,
  Attractions: faPlaneDeparture,
  Shopping: faBagShopping,
  Outdoor: faPersonHiking,
  Nightlife: faChampagneGlasses,
  Culture: faMasksTheater,
  Sports: faPersonRunning,
  Romance: faChildren,
  Adventure: faMountain,
  Wellness: faSpa,
  Family: faUsers,
  History: faLandmark,
  Beaches: faUmbrellaBeach,
  Music: faMusic,
  Festivals: faCalendarAlt,
  Education: faBook,
};

const CategoryButton = ({ categoryName, onSelectCategory }: PropsType) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-3 hover:text-indigo-800 transition cursor-pointer"
      onClick={() => onSelectCategory(categoryName)}
    >
      <FontAwesomeIcon
        size="xl"
        onClick={() => onSelectCategory(categoryName)}
        icon={iconMap[categoryName]}
      />
      <span className="mx-auto my-2 text-sm font-helvetica">
        {categoryName}
      </span>
    </div>
  );
};

type PropsType = {
  categoryName: string;
  // categoryIcon: string;
  onSelectCategory: (key: string) => void;
};

export default CategoryButton;
