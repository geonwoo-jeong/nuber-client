import axios from "axios";
import { GOOGLE_MAP_API_KEY } from "utils/config";

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
  const { status, data } = await axios(URL);
  console.log(status, data);
};
