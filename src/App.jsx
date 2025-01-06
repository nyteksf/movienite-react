import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import ViewAll from "@/pages/ViewAll";
import WatchMovie from "@/pages/WatchMovie";

// import "@/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewall" element={<ViewAll />} />
        <Route path="watchmovie" element={<WatchMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
