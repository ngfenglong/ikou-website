import Container from "./Container";

const NotFoundContainer = ({ children }: PropsType) => {
  return (
    <Container>
      <div className="flex flex-col py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">{children}</div>
      </div>
    </Container>
  );
};

type PropsType = {
  children: React.ReactNode;
};

export default NotFoundContainer;
