import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import Error from './components/Error';
import Services from './components/Services';
import AuthProvider from './context/AuthProvider';
import Login from './components/Login';
import Registration from './components/Registration';
import AllServices from './components/AllServices';
import Details from './components/Details';
import PrivateRoute from './provider/PrivateRoute';
import AddServices from './pages/AddServices';
import ManageServices from './pages/ManageService';
import BookedService from './pages/BookedService';
import Update from './pages/Update';
import Timeline from './components/Timeline';
import WhyManageMate from './components/WhyManageMate';

import ServiceTo from './pages/ServiceTo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    
    children: [
      {
        path: '/',
        element: <>
          <Services></Services>
          <Timeline></Timeline>
          <WhyManageMate></WhyManageMate>

        </>


      },
    ]

  },
  {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'registration',
    element: <Registration></Registration>
  },
  {
    path: 'allServices',
    element: <AllServices></AllServices>
  },
  {
    path:'addServices/allServices',
    element: <AllServices></AllServices>


  },
  {
    path: 'manageService/allServices',
    element: <AllServices></AllServices>
  },
  {
    path: 'bookedService/allServices',
    element: <AllServices></AllServices>

  },
  {
    path: 'services/:id',
    element: <PrivateRoute><Details></Details></PrivateRoute>,
    loader: ({ params }) => fetch(`https://assignment-eleven-server-green.vercel.app/services/${params.id}`)
  },
  {
    path: 'addServices',
    element: <PrivateRoute><AddServices></AddServices></PrivateRoute>
  },
  {
    path: 'manageService',
    element: <PrivateRoute><ManageServices></ManageServices></PrivateRoute>
  },
  {
    path: 'bookedService',
    element: <PrivateRoute><BookedService></BookedService></PrivateRoute>
  },
  {
    path: 'update/:id',
    element: <PrivateRoute><Update></Update></PrivateRoute>,
   
  },
  {
    path: 'serviceTo',
    element: <PrivateRoute><ServiceTo></ServiceTo></PrivateRoute>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
