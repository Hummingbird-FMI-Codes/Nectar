import { memo, useEffect, useRef } from "react";
import { GOOGLE_API_KEY } from "../../env/google_api_key";
import { FMI_location } from "./FMI_location";
import { Location } from "./types";

export const HeatMapBase = memo(function HeatmapDemo(props: {
  width: string;
  height: string;
  points: Location[];
}) {
  const mapRef = useRef(null);

  const callOnce = useRef(false);

  const heatMap = useRef<google.maps.visualization.HeatmapLayer>(null);

  useEffect(() => {
    if (callOnce.current) return;
    callOnce.current = true;

    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    // Cleanup if component unmounts
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initMap() {
    if (!mapRef.current) return;

    const google = window.google;
    // Create the map
    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 17,
      center: FMI_location,
      mapTypeId: "satellite",
    });

    heatMap.current = new google.maps.visualization.HeatmapLayer({
      radius: 20,
      data: props.points.map((point) => {
        return new google.maps.LatLng(point.lat, point.lng);
      }),
      map: newMap,
    });
  }

  useEffect(() => {
    heatMap.current?.setData(
      props.points.map((point) => {
        return new window.google.maps.LatLng(point.lat, point.lng);
      })
    );
  }, [props.points]);

  return (
    <div ref={mapRef} style={{ width: props.width, height: props.height }} />
  );
});
