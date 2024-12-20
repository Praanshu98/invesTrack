import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const NavBar = () => {
  const { user } = useUserContext();

  return (
    <nav>
      <ul className="flex m-2 md:gap-10 mt-8 mr-8 justify-between">
        <div>
          {/* If use is logged in show dashboard else show the landing page. */}
          {!user.isLoggedIn ? (
            <li>
              <Link to="/"> Home </Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard"> Dashboard </Link>
            </li>
          )}
        </div>
        {/* If user is logged in show logout else signup or login. */}
        <div className="flex gap-5">
          {!user.isLoggedIn ? (
            <li>
              <Link to="/login"> Login / Signup </Link>
            </li>
          ) : (
            <li>
              <Link to="/logout"> Logout </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
