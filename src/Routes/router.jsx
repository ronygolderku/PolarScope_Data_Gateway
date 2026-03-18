import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import CatalogList from "../Pages/CatalogList";
import CatalogDetails from "../Pages/CatalogDetails";
import Metrics from "../Pages/Metrics";
import Catalog from "../Pages/Catalog";
import Search from "../Pages/Search";
import MapPage from "../Pages/Map"; // Renamed from Map to avoid JS Map constructor conflict

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
        path: "themes",
        Component: CatalogList,
      },
      {
        path: "themes/:themeId",
        Component: CatalogList,
      },
      {
        path: "eo-missions",
        Component: CatalogList,
      },
      {
        path: "variables",
        Component: CatalogList,
      },
      {
        path: "projects",
        Component: CatalogList,
      },
      {
        path: "projects/*",
        Component: CatalogDetails,
      },
      {
        path: "products",
        Component: CatalogList,
      },
      {
        path: "products/*",
        Component: CatalogDetails,
      },
      {
        path: "eo-missions/*",
        Component: CatalogDetails,
      },
      {
        path: "variables/*",
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
      {
        path: "map",
        Component: MapPage,
      },
    ],
  },
]);
