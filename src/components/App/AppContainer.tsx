import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "src/modules";
import theme from "src/theme";
import { ThemeProvider } from "src/typed-components";
import GlobalStyle from "../../global-styles";
import AppPresenter from "./AppPresenter";

const devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

const AppContainer = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <AppPresenter />
      </>
    </ThemeProvider>
  </Provider>
);

export default AppContainer;
