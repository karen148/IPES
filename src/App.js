import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './theme'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './../src/router/AppRouter'

// const hist = createBrowserHistory();
function App(){
    return (
      <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
      </div>
    );
}

export default App;
