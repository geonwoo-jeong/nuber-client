import Menu from "Components/Menu";
import PropTypes from "prop-types";
import React, { SFC } from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "typed-components";

const Button = styled.button`
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
}

const Container = styled.div``;

const HomePresenter: SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef
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
      {!loading && <Button onClick={toggleMenu}>|||</Button>}
      <Map innerRef={mapRef} />
    </Sidebar>
  </Container>
);

HomePresenter.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  mapRef: PropTypes.any.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default HomePresenter;
