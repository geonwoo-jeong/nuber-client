import AddressBar from "Components/AddressBar";
import Button from "Components/Button";
import Menu from "Components/Menu";
import PropTypes from "prop-types";
import React, { ChangeEvent, SFC } from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "typed-components";

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
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

const RequestButton = styled(ExtendedButton)`
  bottom: 100px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  price: string;
  onAddressSubmit: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div``;

const HomePresenter: SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  price,
  toAddress,
  onAddressSubmit,
  onInputChange
}) => (
  <Container>
    <Helmet>
      <title>Home | Uber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          background: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      <AddressBar
        name={"toAddress"}
        onChange={onInputChange}
        value={toAddress}
        onBlur={null}
      />
      {price && (
        <ExtendedButton
          onClick={onAddressSubmit}
          disabled={toAddress === ""}
          value={`Request Ride $${price}`}
        />
      )}
      <RequestButton
        onClick={onAddressSubmit}
        disabled={toAddress === ""}
        value={price ? "Change Address" : "Pick Address"}
      />
      <Map innerRef={mapRef} />
    </Sidebar>
  </Container>
);

HomePresenter.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  mapRef: PropTypes.any.isRequired,
  onAddressSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default HomePresenter;
