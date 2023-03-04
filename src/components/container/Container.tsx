import clsx from 'clsx';

const Container = ({ className, ...props }: PropsType) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}

type PropsType = {
  className?: string,
  [x:string] : any
};

export default Container;