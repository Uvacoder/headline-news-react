
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRef } from "react";

import MainView from "@/routes/MainView";
import DetailedView from "@/routes/DetailedView";

import "./App.css"
import LandingView from "./routes/LandingView";
import InstructionView from "./routes/InstructionView";
import Admin from "./routes/Admin";

function App() 
{
  const articleHistory = useRef<number[]>([]);

  const addToHistory = (id:number) => {
    if(articleHistory.current.length == 0)
    {
      articleHistory.current.push(id);
    }

    if(articleHistory.current[articleHistory.current.length-1] != id)
    {
      articleHistory.current.push(id);
      if(articleHistory.current.length >= 10)
      {
        articleHistory.current = articleHistory.current.slice(1,10);
      }
    }
  };

  const popFromHistory = () => {
    if(articleHistory.current.length < 2) return 0;
    articleHistory.current.pop();
    return articleHistory.current.pop() || 0;
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/instruction" element={<InstructionView />} />
          <Route path="/view" element={<MainView addToHistory={addToHistory} popFromHistory={popFromHistory} />}  />
          <Route path="/details" element={<DetailedView />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </Router>
  )
}

export default App
