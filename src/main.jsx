import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {RouterProvider} from "react-router";
import { router } from './router/Router.jsx';

import 'aos/dist/aos.css';
import AOS from 'aos';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
// import { Toaster } from 'react-hot-toast';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto '>
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </AuthProvider>
    </div>
  </StrictMode>,
)
