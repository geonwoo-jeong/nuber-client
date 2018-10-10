import Menu from "Components/Menu";
import PropTypes from "prop-types";
import React, { SFC } from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "typed-components";

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
}

const Container = styled.div``;

const HomePresenter: SFC<IProps> = ({ isMenuOpen, toggleMenu, loading }) => (
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
      {!loading && <button onClick={() => toggleMenu()}>Open</button>}
    </Sidebar>
  </Container>
);

HomePresenter.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default HomePresenter;
