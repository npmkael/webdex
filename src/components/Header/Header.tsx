import { navLinks } from "../../constants";
import NavLink from "../NavLink";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="navbar-list">
          {navLinks.map((nav) => (
            <NavLink label={nav.label} path={nav.path} icon={nav.icon} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
