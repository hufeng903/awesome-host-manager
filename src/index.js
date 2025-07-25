import React from "react";
import { createRoot } from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import hostApp from "./reducers";

import registerServiceWorker from "./registerServiceWorker";

let store = createStore(hostApp);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

registerServiceWorker();
