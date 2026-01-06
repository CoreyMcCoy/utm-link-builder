import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <div>
            <h3 className="text-lg font-bold">Cool Project Name</h3>
          </div>
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost cursor-pointer"
          >
            <EllipsisVertical className="w-6 h-6" />
          </button>
          {isOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-md rounded-md z-10 min-w-max">
              <Link
                to="#"
                className="block px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Link
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Another link
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                And another link
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
