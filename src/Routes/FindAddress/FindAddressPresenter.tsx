import AddressBar from "Components/AddressBar";
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
}

class FindAddressPresenter extends Component<IProps> {
  public render() {
    const { mapRef, address, onInputChange, onInputBlur } = this.props;
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
        <Center>📍</Center>
        <Map innerRef={mapRef} />
      </>
    );
  }
}

export default FindAddressPresenter;
