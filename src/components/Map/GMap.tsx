import { GeoJSONPoint } from "ol/format/GeoJSON";
import * as React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import mapStyles from "./gmap-style.json";
import markerIconURL from './marker-icon.svg';

export interface MapProps {
  height: number;
  point: GeoJSONPoint;
  options: any
}

export const GMap = withScriptjs(
  withGoogleMap((props: MapProps) => {
    const [lng, lat] = props.point.coordinates;
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat, lng }}
        defaultOptions={{ styles: mapStyles, ...props.options }}
      >
        <Marker
          icon={{
            url: markerIconURL
          }}
          position={{
            lat,
            lng,
          }}
        />
      </GoogleMap>
    );
  })
);
