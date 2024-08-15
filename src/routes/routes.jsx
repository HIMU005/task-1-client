import { createBrowserRouter } from "react-router-dom";
import Login from "../page/authentication/Login";
import Register from "../page/authentication/Register";
import Products from "../page/Products";
import Root from "../Layout/Root";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/products',
        element: <Products />,
      }
    ]
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
