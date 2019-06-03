import React from "react";
import theme from "src/theme";
import { createGlobalStyle, ThemeProvider } from "src/typed-components";
import reset from "styled-reset";
import AppPresenter from "./AppPresenter";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <AppPresenter />
    </>
  </ThemeProvider>
);

export default AppContainer;
