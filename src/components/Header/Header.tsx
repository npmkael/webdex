import { navLinks } from "../../constants";
import Link from "../Link";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="navbar-list">
          {navLinks.map((nav) => (
            <Link label={nav.label} path={nav.path} icon={nav.icon} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
