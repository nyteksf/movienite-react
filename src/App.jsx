import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import ViewAll from "@/pages/ViewAll";
import Watch from "@/pages/Watch";

import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="discover/search/:query" element={<ViewAll />} />
        <Route path="discover/:category" element={<ViewAll />} />
        <Route path="discover" element={<ViewAll />} />
        <Route path="watch/:movieId" element={<Watch />} />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
