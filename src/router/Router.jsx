import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import Payment from "../pages/DashBoard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'sendParcel',
        loader: () => fetch('./serviceCenter.json'),
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'myParcels',
        Component:MyParcels
      },
      {
        path:'payment/:id',
        Component: Payment 
      }
    ]
  }
]);

