import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar';

const RootLayout = () => {
 return (
    <div >
      <div >
        <div className="sticky-navbar ">
          <Navbar></Navbar>
        </div>
        <div className="outlet-color" >
 <Outlet></Outlet>
        </div>
       
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;