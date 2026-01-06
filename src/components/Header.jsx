import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF7]/80 backdrop-blur-sm border-b border-slate-100">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-800 hover:text-slate-600 transition-colors"
        >
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <LinkIcon size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            UTM Link Builder
          </span>
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
