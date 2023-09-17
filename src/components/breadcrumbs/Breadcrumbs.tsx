import { Link, useLocation } from "react-router-dom";
import { BreadCrumbsRoute } from "../../model/breadcrumbs";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

const BreadCrumbs = ({ pages }: PropsType) => {
  const location = useLocation();

  return (
    <ol className="flex items-center space-x-0.5">
      <li>
        <div>
          <Link to="/" className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </div>
      </li>
      {pages.map((page) => (
        <li key={page.name}>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {page.href.toLowerCase() === location.pathname.toLowerCase() ||
            page.href === "" ? (
              <span className="ml-0.5 text-sm font-medium text-gray-700">
                {page.name}
              </span>
            ) : (
              <Link
                to={page.href}
                className="ml-0.5 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

type PropsType = {
  pages: BreadCrumbsRoute[];
};

export default BreadCrumbs;
