import Container from '../container/Container';

const ServerErrorBanner = () => {
  return (
    <Container>
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          There seems to be a problem with our server. We're working hard to fix
          it. In the meantime, please try again later.
        </p>
      </div>
    </Container>
  );
};

export default ServerErrorBanner;
