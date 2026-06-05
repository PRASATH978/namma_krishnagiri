import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/issues" element={<Issues />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;