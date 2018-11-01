import React, { Component } from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "sharedQueries.queries";
import { userProfile } from "types/api";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.watchPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
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
  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const latLng = new google.maps.LatLng(lat, lng);
    const mapConfig: google.maps.MapOptions = {
      center: latLng,
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 11
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
      this.handleGeoSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = (position: Position) => {
    console.log("success");
    console.log(position);
  };
  public handleGeoWatchError = () => {
    console.log("some err");
  };
  public handleGeoError = () => {
    console.log("some err");
  };
}

export default HomeContainer;
