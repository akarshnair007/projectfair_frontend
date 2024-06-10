import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Project from "./pages/Project";
import Footer from "./components/Footer";
import "./bootstrap.min.css";
import { useContext } from "react";
import { isAuthorizedContext } from "./Context/Context";

function App() {
  const { isAuthorized } = useContext(isAuthorizedContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route
          path="/dashboard"
          element={isAuthorized ? <Dashboard dashboard={true} /> : <Home />}
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
