import { NavLink } from "react-router-dom";

import styles from "./PokeLink.module.css";

type Props = {
  label: string;
  icon?: string;
  path: string;
};

const PokeLink = ({ label, icon, path }: Props) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? `${styles["navbar-link"]} ${styles.active}`
            : styles["navbar-link"]
        }
      >
        <span className={styles["navbar-icon"]}>{icon ? icon : "e"}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default PokeLink;
