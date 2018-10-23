import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAP_API_KEY } from "utils/config";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(FindAddressContainer);
