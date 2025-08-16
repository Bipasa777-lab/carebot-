import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./app/page";
import About from "./app/about";
import Landing from "./app/home";

// Import UI components
import { Card } from "./components/ui/card";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
