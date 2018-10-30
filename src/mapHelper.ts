import axios from "axios";
import { toast } from "react-toastify";
import { GOOGLE_MAP_API_KEY } from "utils/config";

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
  const { status, data } = await axios(URL);
  if (status === 200) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
    console.log(status, data);
  } else {
    toast.error(data.error_message);
  }
};
