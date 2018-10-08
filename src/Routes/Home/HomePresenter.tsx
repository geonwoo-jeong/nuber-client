import React, { SFC } from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "typed-components";

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Container = styled.div``;

const HomePresenter: SFC<IProps> = ({ isMenuOpen, toggleMenu }) => (
  <Container>
    <Helmet>
      <title>Home | Uber</title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar content</b>}
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
      <button onClick={() => toggleMenu()}>Open</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;
