import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // react和Web浏览器对接DOM的库
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);