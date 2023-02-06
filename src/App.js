import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Holding from "./components/holding";
import Main from "./components/Main";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
