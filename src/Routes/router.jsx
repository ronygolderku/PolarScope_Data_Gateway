import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import CatalogList from "../Pages/CatalogList";
import CatalogDetails from "../Pages/CatalogDetails";
import Metrics from "../Pages/Metrics";
import Catalog from "../Pages/Catalog";
import Search from "../Pages/Search";

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
      {
        path: "metrics",
        Component: Metrics,
      },
      {
        path: "catalog",
        Component: Catalog,
      },
      {
        path: "search",
        Component: Search,
      },
    ],
  },
]);
