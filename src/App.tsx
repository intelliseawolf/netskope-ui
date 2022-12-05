import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./containers/Layout";
import Home from "./containers/Home";

const App: React.FC = () => (
  <BrowserRouter>
    <Layout />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
