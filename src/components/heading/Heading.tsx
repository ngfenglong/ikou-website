const MainHeading = (props: PropsType) => {
  return (
    <div id={props.id}>
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        {props.children}
      </h2>
    </div>
  );
};

type PropsType = {
  children: React.ReactNode;
  id?: string;
  callbackAction?: () => {};
};

export default MainHeading;
