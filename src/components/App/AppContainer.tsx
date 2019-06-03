import React from "react";
import theme from "src/theme";
import { ThemeProvider } from "src/typed-components";
import GlobalStyle from "../../global-styles";
import AppPresenter from "./AppPresenter";

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <AppPresenter />
    </>
  </ThemeProvider>
);

export default AppContainer;
