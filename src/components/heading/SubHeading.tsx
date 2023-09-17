const SubHeading = (props: PropsType) => {
  return (
    <div id={props.id} className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {props.children}
      </h3>
    </div>
  );
};

type PropsType = {
  children: React.ReactNode;
  id?: string;
  callBackAction?: () => void;
};

export default SubHeading;
