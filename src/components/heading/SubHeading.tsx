const SubHeader = (props: PropsType) => {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {props.subHeader}
      </h3>
    </div>
  );
};

type PropsType = {
  subHeader: string;
  callBackAction?: () => {};
};

export default SubHeader;
