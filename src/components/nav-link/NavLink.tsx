import { NavLink as BaseNavLink } from 'react-router-dom';

const NavLink: ({ href, children }: PropsType) => JSX.Element = ({
  href,
  children,
}) => {
  return (
    <BaseNavLink
      to={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </BaseNavLink>
  );
};

type PropsType = {
  href: string;
  children: string;
};

export default NavLink;
