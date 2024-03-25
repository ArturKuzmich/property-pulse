import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import pin from "@/assets/images/pin.svg";
import Spinner from "@/components/Spinner";
import Image from "next/image";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(false);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.zipcode} `,
        );
        //Check for results
        if (res.results?.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (e) {
        console.error(e);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);
  if (loading) return <Spinner />;

  if (geocodeError) {
    //Handle case where geocode failed
    return <div className="text-xl">No location data found</div>;
  }
  return (
    !loading && (
      <div>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 15,
          }}
          style={{
            width: "100%",
            height: "500px",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={lng} latitude={lat} anchor={"bottom"}>
            <Image src={pin} alt="location" width={40} height={40} />
          </Marker>
        </Map>
      </div>
    )
  );
};

export default PropertyMap;
