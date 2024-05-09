
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainView from "@/routes/MainView";
import DetailedView from "@/routes/DetailedView";

import "./App.css"
import LandingView from "./routes/LandingView";
import InstructionView from "./routes/InstructionView";
import Admin from "./routes/Admin";
import { useState } from "react";

function App() 
{
  const [viewInstructions, setViewInstructions] = useState(true);

  const onInstructionsViewed = ()=>
  {
    setViewInstructions(false);
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/instruction" element={<InstructionView />} />
          <Route path="/view" element={<MainView viewInstructions={viewInstructions} onInstructionsViewed={onInstructionsViewed} />}  />
          <Route path="/details" element={<DetailedView />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </Router>
  )
}

export default App
