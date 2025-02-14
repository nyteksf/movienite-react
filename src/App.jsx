import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import ViewAll from "@/pages/ViewAll";
import Watch from "@/pages/Watch";

import "@/App.css";

/*                                                    O.'
                                                 . o O   0 'oOo
                                                         OO0oO,`O,o  0,                
      _  __  __    __ ______   ___    __  __    ___      ___ `"      `0.oOo
     | \| |  \ \  / /|_   _|  | __|  | |/ /   / __|    | __|             Oo'   
     | .` |   \ V /    | |    | _|   | ' <    \__ \    | _|       _____    `0
     |_|\_|   _|_|_   _|_|_   |___|  |_|\_\   |___/   _|_|_   ___ |[]|____n_I_c    
    _|"""""|_| """ |_|"""""|_|"""""|_|"""""|_|"""""|_| """ |_|___||__|###|____}
####"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`O-O--O-O+++--O-O ###################

#dr3am

*/

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
