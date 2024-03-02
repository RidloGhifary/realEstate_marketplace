import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { UseAppContext } from "./context/AppContext";
import CreateMarketplace from "./pages/CreateMarketplace";
import Estate from "./pages/Estate";

function App() {
  const { isLoggedIn } = UseAppContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/estate/:id" element={<Estate />} />

        <Route
          path="/sign-in"
          element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/upload"
            element={isLoggedIn ? <CreateMarketplace /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
