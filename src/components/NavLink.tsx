type Props = {
  label: string;
  icon?: string;
  path: string;
};

const NavLink = ({ label, icon, path }: Props) => {
  return (
    <li>
      <a href={path} className="navbar-link">
        <span className="navbar-icon">{icon ? icon : "e"}</span>
        {label}
      </a>
    </li>
  );
};

export default NavLink;
