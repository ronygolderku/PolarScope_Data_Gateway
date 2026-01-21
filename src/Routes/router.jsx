import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import CatalogList from "../Pages/CatalogList";
import CatalogDetails from "../Pages/CatalogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "themes/:themeId",
        Component: CatalogList,
      },
      {
        path: "products/*",
        Component: CatalogDetails,
      },
    ],
  },
]);
