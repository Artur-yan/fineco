import { Map, Feature, View, Overlay } from "ol";
import OverlayPositioning from "ol/OverlayPositioning";
import * as Control from "ol/control";
import { GeoJSONPoint } from "ol/format/GeoJSON";
import Point from "ol/geom/Point";
import { Tile as TileLayer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import * as React from "react";
import iconImg from "../../../img/map-marker.svg";
import { useMediaQuery, tabletQuery } from "@utils/index";

export interface OLMapProps {
  height: number;
  point: GeoJSONPoint;
}

let map: Map;

export default function OLMapFragment(props: OLMapProps) {
  const isTablet = useMediaQuery(tabletQuery);

  const markerPopup = new Feature({
    name: "Squash HQ",
    geometry: new Point(fromLonLat(props.point.coordinates)),
  });

  const markerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: iconImg,
    }),
  });

  markerPopup.setStyle(markerStyle);

  const vectorSource = new VectorSource({
    features: [markerPopup],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const [height, setHeight] = React.useState(props.height);

  const updateDimensions = () => {
    const h = window.innerWidth >= 992 ? window.innerHeight : 400;
    setHeight(h);
    map.updateSize();
  };

  React.useEffect(() => {
    if (map === undefined) {
      // Create an Openlayer Map instance with two tile layers
      map = new Map({
        //  Display the map in the div with the id of map
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        // Add in the following map controls
        controls: Control.defaults({
          zoom: false,
        }),
        // Render the tile layers in a map view with a Mercator projection
        view: new View({
          center: fromLonLat(props.point.coordinates),
          zoom: 15,
        }),
      });

      const element = document.getElementById("popup");
      if (element !== null) {
        const popup = new Overlay({
          element: element,
          positioning: OverlayPositioning.BOTTOM_CENTER,
          stopEvent: false,
          offset: [0, -50],
        });
        map.addOverlay(popup);
      }
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  });

  const style = {
    width: "100%",
    height: isTablet ? 300 : height,
    maxHeight: isTablet ? 300 : height,
    backgroundColor: "#cccccc",
  };
  return (
    <div>
      <div id="map" style={style} />
      <div id="popup" />
    </div>
  );
}
