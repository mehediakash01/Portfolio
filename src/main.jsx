import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router/router'
import { RouterProvider } from 'react-router'
import AOS from "aos";
import "aos/dist/aos.css";

export function AppWrapper() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return <RouterProvider router={router} />;
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper></AppWrapper>
  </StrictMode>,
)
