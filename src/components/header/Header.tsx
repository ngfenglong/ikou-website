import { Disclosure } from '@headlessui/react';
import SearchBar from '../searchbar/Searchbar';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderMobile from './HeaderMobile';

const Header = () => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex h-16 justify-between">
              <HeaderLeft />
              <SearchBar />
              <HeaderRight />
              <HeaderMobile open={open} />
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
