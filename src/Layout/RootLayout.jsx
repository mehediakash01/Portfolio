import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import CustomCursor from '../Component/CustomCursor';

const RootLayout = () => {
    return (
        <div>
             <CustomCursor />
          
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;