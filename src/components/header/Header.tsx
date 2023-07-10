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
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
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
