import { navLinks } from "../../constants";
import Link from "../PokeLink/PokeLink";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles["navbar-list"]}>
          {navLinks.map((nav) => (
            <Link label={nav.label} path={nav.path} icon={nav.icon} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
