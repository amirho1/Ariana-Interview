import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Chart from "./routes/Chart";
import AppBar from "./components/AppBar";
import FoF from "./components/FoF";
import { useSelector } from "react-redux";
import { getUsers } from "./redux/features/usersSlice";
import { saveOnLocalStorage } from "./helpers";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chart",
    element: <Chart />,
  },
  // * This object should be the last
  {
    path: "*",
    element: <FoF />,
  },
];

function wrapElementsWithRouteEl({ path, element }) {
  return path === "/" ? (
    <Route index element={element} key={path} />
  ) : (
    <Route key={path} path={path} element={element} />
  );
}

function App() {
  const users = useSelector(getUsers);

  useEffect(() => {
    saveOnLocalStorage("users", users);
  }, [users]);

  return (
    <div className="App">
      <AppBar />
      <Routes>{router.map(wrapElementsWithRouteEl)}</Routes>
    </div>
  );
}

export default App;
