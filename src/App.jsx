import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AdBanner from "./components/AdBanner";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <AdBanner />
    </div>
  );
}
