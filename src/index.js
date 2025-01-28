import React from "react";
import ReactDOM from "react-dom";
import EarningsCalculator from "./App";
import "./index.css"; // Optional, only if you have global styles.

ReactDOM.render(
  <React.StrictMode>
    <EarningsCalculator />
  </React.StrictMode>,
  document.getElementById("root") // This assumes your `public/index.html` has a `<div id="root"></div>`.
);
