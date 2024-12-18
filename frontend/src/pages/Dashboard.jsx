import { useUserContext } from "../context/userContext";

const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>
        Welcome, {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Dashboard;
