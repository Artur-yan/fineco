import { GeoJSONPoint } from "ol/format/GeoJSON";
import * as React from "react";
import { isServer } from "@utils/isServer";

export interface LazyMapProps {
  height: number;
  point: GeoJSONPoint;
}

export const LazyMap = (props: LazyMapProps) => {
  if (isServer) return <div>loading...</div>;
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const Component = React.lazy(() => import("./OLMap"));
  return (
    <div>
      <React.Suspense fallback={<span>...loading</span>}>
        <Component height={props.height} point={props.point} />
      </React.Suspense>
    </div>
  );
};
