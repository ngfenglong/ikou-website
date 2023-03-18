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
  children: string | JSX.Element | JSX.Element[];
  id?: string;
  callbackAction?: () => {};
};

export default MainHeading;
