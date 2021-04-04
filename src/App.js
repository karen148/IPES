import React from "react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './../src/router/AppRouter'

// const hist = createBrowserHistory();
function App(){
    return (
      <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      </div>
    );
}

export default App;
