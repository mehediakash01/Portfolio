import {
  createBrowserRouter,

} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import ProjectDetails from "../Component/Projects/PackageDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {index:true,
            Component: Home,
        },
        {
          path:"project/:id",
          Component: ProjectDetails
        }
    ]
  },
]);
