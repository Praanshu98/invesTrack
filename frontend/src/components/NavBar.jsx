import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const NavBar = () => {
  const { user } = useUserContext();

  return (
    <nav className="mb-4 border-b-2 border-purssian-blue-200">
      <ul className="m-2 mr-8 mt-8 flex justify-between md:gap-10">
        <div>
          {/* If use is logged in show dashboard else show the landing page. */}
          {user ? (
            <div className="flex gap-4">
              <li>
                <Link to="/dashboard"> Dashboard </Link>
              </li>
              <li>
                <Link to="/buy"> Buy </Link>
              </li>
              <li>
                <Link to="/sell"> Sell </Link>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/"> Home </Link>
            </li>
          )}
        </div>
        {/* If user is logged in show logout else signup or login. */}
        <div>
          {user ? (
            <li>
              <Link to="/logout"> Logout </Link>
            </li>
          ) : (
            <li>
              <Link to="/login"> Login / Signup </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
