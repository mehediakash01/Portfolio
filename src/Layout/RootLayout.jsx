import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import CustomCursor from '../Component/CustomCursor';
import ScrollToTop from '../Component/ScrollToTop';
import useAnalyticsTracking from '../Hooks/useAnalyticsTracking';
import WelcomeOverlay from '../Component/Music/WelcomeOverlay';
import MuteButton from '../Component/Music/MuteButton';
import Navbar from '../Component/Navbar/Navbar';
import { useMusic } from '../context/MusicContext';

const RootLayout = () => {
    useAnalyticsTracking();
    const { hasStarted } = useMusic();

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#02040a]">
            <CustomCursor />
            <WelcomeOverlay />
            <MuteButton />
            <Navbar />
          
            <div
                className={`pt-20 sm:pt-24 transition-opacity duration-[1500ms] ease-out ${
                    hasStarted ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Outlet></Outlet>
                <Footer></Footer>
                <ScrollToTop />
            </div>
            
        </div>
    );
};

export default RootLayout;
