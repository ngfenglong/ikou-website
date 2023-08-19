import { Link } from 'react-router-dom';
import NotFoundContainer from '../../components/container/NotFoundContainer';

const ComingSoonPage = () => {
  return (
    <NotFoundContainer>
      <h1 className="mb-16 text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl">
        Under Construction
      </h1>
      <img
        src="/images/background/coming-soon-2.jpg"
        alt="Coming Soon"
        className="inset-0 -z-10 w-64 h-64 mx-auto object-cover object-top"
      />
      <div className="mt-10 flex justify-center">
        <Link to="/#" className="text-sm font-semibold leading-7 text-gray-700">
          <span aria-hidden="true">&larr;</span> Back to home
        </Link>
      </div>
    </NotFoundContainer>
  );
};

export default ComingSoonPage;
