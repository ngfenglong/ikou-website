const baseColors: BaseStylesInterface = {
  gray: 'inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800',
  red: 'inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800',
  yellow:
    'inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800',
  green:
    'inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800',
  blue: 'inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800',
  indigo:
    'inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800',
  purple:
    'inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-800',
  pink: 'inline-flex items-center rounded-md bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800',
};

const RoundedBadge = (props: RoundedBadgePropsType) => {
  return <span className={`${props.classNames} ${baseColors[props.color]}`}>{props.children}</span>;
};

type RoundedBadgePropsType = {
  children: React.ReactNode;
  color: string;
  classNames?: string;
};

type BaseStylesInterface = {
  [style: string]: string;
};

export default RoundedBadge;
