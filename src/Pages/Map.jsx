import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "proj4";
import "proj4leaflet";

const MapPage = () => {
  const southPolarCRS = useMemo(
    () =>
      new L.Proj.CRS(
        "EPSG:3031",
        "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
        {
          origin: [-33699550.99203, 33699551.01703],
          resolutions: [
            238810.813354,
            119405.406677,
            59702.7033385,
            29851.35166925,
            14925.675834625,
            7462.8379173125,
            3731.41895865625,
            1865.709479328125,
            932.8547396640625,
            466.42736983203125,
            233.21368491601562,
            116.60684245800781,
            58.303421229003906,
            29.151710614501953,
            14.575855307250977,
          ],
        }
      ),
    []
  );

  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <MapContainer
        crs={southPolarCRS}
        center={[-90, 0]}
        zoom={3.8}
        minZoom={3}
        maxZoom={8}
        zoomSnap={0.1}
        zoomDelta={0.2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='Source: Esri, Earthstar Geographics'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Polar/Antarctic_Imagery/MapServer/tile/{z}/{y}/{x}"
          noWrap={true}
        />
      </MapContainer>
    </div>
  );
};

export default MapPage;
