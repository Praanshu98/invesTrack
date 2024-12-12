import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => {
  return <StrictMode>Hello World!</StrictMode>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
