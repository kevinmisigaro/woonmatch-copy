import React, {
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { Geodata, House } from "../interfaces";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import Card from "./Card";

const MapView = ({
  houses,
  markerClickable = true,
  dimensionsClassName = "w-full h-[90vh]",
}) => {
  const maps_api_key =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "AIzaSyBC8ezpOuePbRwRfoWodokKzDx8xLb3Kgs";
  const initialLatitude = 52.1737344;
  const initialLongitude = 5.7039356;
  const initialZoom = 14.45;
  const [center, setCenter] = useState({
    lat: initialLatitude,
    lng: initialLongitude,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: maps_api_key,
  });

  const [map, setMap] = useState(null);
  const [clickedHouse, setClickedHouse] = useState(null);
  const [clickedHousePosition, setClickedHousePosition] = useState({
    top: 0,
    left: 0,
  });
  const [houseInfoPosition, setHouseInfoPosition] = useState({
    top: 0,
    left: 0,
  });

  const [pageOffsetY, setPageOffsetY] = useState(0);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const houseInfoRef = useRef(null);
  const mapWraaperRef = useRef(null);

  useEffect(() => {
    if (houses?.length > 0) {
      let coordinates = houses.map((house) => house.geodata);

      let _center = getCenter(coordinates);
      setCenter({
        lat: _center.latitude,
        lng: _center.longitude,
      });
    }
  }, [houses]);

  useEffect(() => {
    setClickedHouseFinalPositions();
  }, [clickedHouse, clickedHousePosition]);

  useEffect(() => {
    if (clickedHouse) {
      document.addEventListener("click", handleAfterCardShowClick);
    }
    return () => {
      document.removeEventListener("click", handleAfterCardShowClick);
    };
  }, [clickedHouse]);

  const handleAfterCardShowClick = () => {
    if (clickedHouse) {
      setClickedHouse(null);
    }
  };

  const setClickedHouseFinalPositions = () => {
    if (clickedHouse != null && houseInfoRef?.current) {
      let wrapperLeft = mapWraaperRef.current.offsetLeft;
      let wrapperTop = mapWraaperRef.current.offsetTop;
      let wrapperHeight = mapWraaperRef.current.offsetHeight;
      let wrapperWidth = mapWraaperRef.current.offsetWidth;

      let cardWidth = houseInfoRef.current.offsetWidth;
      let cardHeight = houseInfoRef.current.offsetHeight;

      let houseInfoLeft = clickedHousePosition.left - wrapperLeft;
      let houseInfoTop = clickedHousePosition.top + pageOffsetY - wrapperTop;

      if (houseInfoTop + cardHeight > wrapperHeight) {
        houseInfoTop = wrapperHeight - cardHeight;
      }

      if (houseInfoLeft + cardWidth > wrapperWidth) {
        houseInfoLeft = wrapperWidth - cardWidth;
      }

      setHouseInfoPosition({
        left: houseInfoLeft,
        top: houseInfoTop,
      });
    }
  };

  return isLoaded ? (
    <div
      ref={mapWraaperRef}
      className={`relative ${dimensionsClassName} bg-slate-200`}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        id="map"
        center={center}
        zoom={initialZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        <>
          {houses.map((house: House, i: number) => (
            <Marker
              clickable={markerClickable}
              icon={"/images/map_marker.svg"}
              animation={google.maps.Animation.DROP}
              onClick={(e) => {
                setTimeout(() => {
                  setClickedHouse(house);
                  setPageOffsetY(e.domEvent["view"]["pageYOffset"]);
                  setClickedHousePosition({
                    left: e.domEvent["clientX"],
                    top: e.domEvent["clientY"],
                  });
                }, 10);
              }}
              key={i}
              position={{
                lat: house.geodata.latitude,
                lng: house.geodata.longitude,
              }}></Marker>
          ))}
        </>
      </GoogleMap>
      <div
        ref={houseInfoRef}
        style={{
          left: houseInfoPosition.left,
          top: houseInfoPosition.top,
        }}
        className={`absolute w-[300px] xl:w-[600px] 3xl:w-[700px] h-auto top-0`}>
        {clickedHouse && <Card house={clickedHouse} />}
      </div>
    </div>
  ) : (
    <></>
  );
};

const getCenter = (coordinates: Array<Geodata>): Geodata => {
  let sum_coordinates = coordinates.reduce(
    (prev, current) => ({
      longitude: prev.longitude + current.longitude,
      latitude: prev.latitude + current.latitude,
    }),
    { longitude: 0, latitude: 0 }
  );

  let center = {
    longitude: sum_coordinates.longitude / coordinates.length,
    latitude: sum_coordinates.latitude / coordinates.length,
  };

  return center;
};

export default MapView;
