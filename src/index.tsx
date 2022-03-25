import React from "react";
import ReactDOM from "react-dom";
import OptionsPage from "./options";
import PopupPage from "./popup";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <PopupPage />
  </React.StrictMode>,
  document.getElementById("popup") || document.createElement("div")
);

ReactDOM.render(
  <React.StrictMode>
    <OptionsPage />
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
