import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Vehicles from "./components/Dashboard/Vehicles";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />

    },
    {
      path: "/about",
      element: <About />

    },
    {
      path: "/dashboard",
      element: <UserDashboard />,
      children: [
        {
          path: "",
          element: <Navigate to="vehicles" replace />
        },
        {
          path: "vehicles",
          element: <Vehicles />
        }
        // {
        //   path: "messages",
        //   element: <Messages />
        // }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;
