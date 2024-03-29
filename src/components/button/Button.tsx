import clsx from "clsx";
import { Link } from "react-router-dom";

const baseStyles: BaseStylesInterface = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles: VariantStylesInterface = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

const Button = ({
  variant = "solid",
  color = "slate",
  className,
  href,
  ...props
}: PropsType) => {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
  );

  return href ? (
    <Link to={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
};

type PropsType = {
  variant?: string;
  color?: string;
  className?: string;
  href?: string;
  [x: string]: any;
};

type BaseStylesInterface = {
  [style: string]: string;
};

type VariantStylesInterface = {
  [style: string]: { [className: string]: string };
};

export default Button;
