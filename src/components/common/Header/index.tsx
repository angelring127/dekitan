import { HamburgerButton } from "../HamburgerButton";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div>
        <HamburgerButton />
      </div>
    </header>
  );
};

export default Header;
