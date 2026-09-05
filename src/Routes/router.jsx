import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import CatalogList from "../Pages/CatalogList";
import CatalogDetails from "../Pages/CatalogDetails";
import Metrics from "../Pages/Metrics";
import Catalog from "../Pages/Catalog";
import Search from "../Pages/Search";
import BGCArgoPage from "../Pages/BGC-argo";
import Tutorials from "../Pages/Tutorials";
import NotebookViewer from "../Pages/NotebookViewer";
import Documentation from "../Pages/Documentation";
import GettingStarted from "../Pages/GettingStarted";
import GettingStartedEO from "../Pages/tutorials/GettingStartedEO";
import AccessingData from "../Pages/tutorials/AccessingData";
import WorkingWithNetCDF from "../Pages/tutorials/WorkingWithNetCDF";
import SSTAnalysis from "../Pages/tutorials/SSTAnalysis";
import SeaIceAnalysis from "../Pages/tutorials/SeaIceAnalysis";

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
        Component: BGCArgoPage,
      },
      {
        path: "bgc-argo",
        Component: BGCArgoPage,
      },
      {
        path: "tutorials",
        Component: Tutorials,
      },
      {
        path: "notebook-viewer",
        Component: NotebookViewer,
      },
      {
        path: "documentation",
        Component: Documentation,
      },
      {
        path: "getting-started",
        Component: GettingStarted,
      },
      {
        path: "tutorials/getting-started-eo",
        Component: GettingStartedEO,
      },
      {
        path: "tutorials/accessing-data",
        Component: AccessingData,
      },
      {
        path: "tutorials/working-with-netcdf",
        Component: WorkingWithNetCDF,
      },
      {
        path: "tutorials/sst-analysis",
        Component: SSTAnalysis,
      },
      {
        path: "tutorials/sea-ice-analysis",
        Component: SeaIceAnalysis,
      },
    ],
  },
]);
