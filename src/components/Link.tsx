import { NavLink } from "react-router-dom";

type Props = {
  label: string;
  icon?: string;
  path: string;
};

const Link = ({ label, icon, path }: Props) => {
  return (
    <li>
      <NavLink to={path} className="navbar-link">
        <span className="navbar-icon">{icon ? icon : "e"}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default Link;
