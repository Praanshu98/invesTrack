import { useUserContext } from "../context/userContext";

const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div>
      <p className="text-2xl font-bold">
        Welcome, {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Dashboard;
