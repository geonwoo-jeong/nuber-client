import { geoCode } from "mapHelper";
import React, { ChangeEvent, Component } from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { USER_PROFILE } from "sharedQueries.queries";
import { userProfile } from "types/api";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
  distance?: string;
  duration?: string;
  price?: string;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public state = {
    distance: "",
    duration: "",
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    price: "",
    toAddress: "",
    toLat: 0,
    toLng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    const getCurrentOptions: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000
    };

    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError,
      getCurrentOptions
    );
  }
  public render() {
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
            toAddress={toAddress}
            price={price}
            onInputChange={this.onInputChange}
            onAddressSubmit={this.onAddressSubmit}
          />
        )}
      </ProfileQuery>
    );
  }
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    const latLng = new google.maps.LatLng(latitude, longitude);
    this.loadMap(latLng);
  };
  public loadMap = latLng => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(latLng);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 13
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: latLng
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    const latLng = new google.maps.LatLng(latitude, longitude);
    this.userMarker.setPosition(latLng);
    this.map.panTo(latLng);
  };
  public handleGeoWatchError = () => {
    console.log("some err");
  };
  public handleGeoError = () => {
    console.log("some err");
  };
  public onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      const latLng = new google.maps.LatLng(this.state.lat, this.state.lng);
      const toLatLng = new google.maps.LatLng(lat, lng);
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: toLatLng
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend(toLatLng);
      bounds.extend(latLng);

      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formattedAddress,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
    }
  };
  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const origin = new google.maps.LatLng(lat, lng);
    const destination = new google.maps.LatLng(toLat, toLng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination,
      origin,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(directionsOptions, this.handleRouteRequest);
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      this.setState(
        {
          distance,
          duration
        },
        this.setPrice
      );
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
    } else {
      toast.error("There is no route there, you have to swim.");
    }
  };
  public setPrice = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({
        price: Number(parseFloat(distance.replace(",", "")) * 3).toFixed(2)
      });
    }
  };
}

export default HomeContainer;
