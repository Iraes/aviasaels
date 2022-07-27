import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./main.scss";
import App from "./components/App/Index";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
