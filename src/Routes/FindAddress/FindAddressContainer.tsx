import { geoCode, reverseGeoCode } from "mapHelper";
import React, { ChangeEvent, Component } from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  address: string;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class FindAddressContainer extends Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    address: "",
    lat: 0,
    lng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        onPickPlace={this.onPickPlace}
      />
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };
  public handleGeoError = error => {
    console.log(error);
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 14
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };
  public onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      this.setState({
        address: formattedAddress,
        lat,
        lng
      });
      const latLng = new google.maps.LatLng(lat, lng);
      this.map.setZoom(17);
      this.map.panTo(latLng);
    }
  };
  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };
  public onPickPlace = () => {
    const { address, lat, lng } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/add-place",
      state: {
        address,
        lat,
        lng
      }
    });
    console.log(lat, lng);
  };
}

export default FindAddressContainer;
