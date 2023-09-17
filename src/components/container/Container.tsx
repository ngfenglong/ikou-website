import clsx from "clsx";

const Container = ({ className, ...props }: PropsType) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
};

type PropsType = {
  className?: string;
  [x: string]: any;
};

export default Container;
