import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import CustomCursor from '../Component/CustomCursor';
import ScrollToTop from '../Component/ScrollToTop';
import useAnalyticsTracking from '../Hooks/useAnalyticsTracking';

const RootLayout = () => {
    useAnalyticsTracking();

    return (
        <div>
             <CustomCursor />
          
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTop />
            
        </div>
    );
};

export default RootLayout;
