import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.scss';
import App from './components/App';
import { debounce } from "debounce";
import { store } from "./store";
import { saveState } from "./utils/reduxToLocalStorage";
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
