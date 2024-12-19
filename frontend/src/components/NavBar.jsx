import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-row m-2 gap-5 md:gap-10 justify-end mt-8 mr-8">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/login"> Login / Signup </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
