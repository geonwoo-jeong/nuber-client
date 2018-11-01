import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAP_API_KEY } from "utils/config";
import HomeContainer from "./HomeContainer";
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(HomeContainer);
