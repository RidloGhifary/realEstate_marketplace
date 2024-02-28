import { UseAppContext } from "../context/AppContext.jsx";

const Home = () => {
  const { isLoggedIn } = UseAppContext();

  return <div>{isLoggedIn ? "Ridlo" : "Home"}</div>;
};

export default Home;
