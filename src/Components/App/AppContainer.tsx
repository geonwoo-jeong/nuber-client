import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import theme from "theme";
import AppPresent from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <AppPresent isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={toast.POSITION.BOTTOM_CENTER} />
  </Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
