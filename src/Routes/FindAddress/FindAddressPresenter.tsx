import AddressBar from "Components/AddressBar";
import Button from "Components/Button";
import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "typed-components";

const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: context-menu;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface IProps {
  address: string;
  mapRef: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  onPickPlace: () => void;
}

class FindAddressPresenter extends Component<IProps> {
  public render() {
    const {
      mapRef,
      address,
      onInputChange,
      onInputBlur,
      onPickPlace
    } = this.props;
    return (
      <>
        <Helmet>
          <title>Find Address | Uber</title>
        </Helmet>
        <AddressBar
          onBlur={onInputBlur}
          onChange={onInputChange}
          name={"address"}
          value={address}
        />
        <ExtendedButton value={"Pick this place"} onClick={onPickPlace} />
        <Center>📍</Center>
        <Map innerRef={mapRef} />
      </>
    );
  }
}

export default FindAddressPresenter;
