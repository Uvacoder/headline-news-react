
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRef, useState } from "react";

import MainView from "@/routes/MainView";
import DetailedView from "@/routes/DetailedView";

import "./App.css"
import LandingView from "./routes/LandingView";
import InstructionView from "./routes/InstructionView";
import Admin from "./routes/Admin";
import AboutUs from "./routes/AboutUs";
import ContactUs from "./routes/ContactUs";
import { ArticleHistory } from "./types/ArticleHistory";

function App() 
{
  const articleHistory = useRef<ArticleHistory[]>([]);
  const [autoScroll, setAutoscroll] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const addToHistory = (history: ArticleHistory) => {
    if(
      articleHistory.current.length && 
      articleHistory.current[articleHistory.current.length - 1].article.id === history.article.id
    )
      return;
    articleHistory.current.push(history);
    if(articleHistory.current.length > 10)
      articleHistory.current.shift();
  };

  const popFromHistory = () => {
    return articleHistory.current.pop() ?? null;
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/instruction" element={<InstructionView />} />
          <Route path="/view" element={
              <MainView
                addToHistory={addToHistory} popFromHistory={popFromHistory}
                autoScroll={autoScroll} setAutoscroll={setAutoscroll}
                showMenu={showMenu} setShowMenu={setShowMenu}
              />
            }
          />
          <Route path="/details" element={<DetailedView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          
        </Routes>
    </Router>
  )
}

export default App
