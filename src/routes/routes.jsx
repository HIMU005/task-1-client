import { createBrowserRouter } from "react-router-dom";
import Login from "../page/authentication/Login";
import Register from "../page/authentication/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home111111111111111111</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
]);
