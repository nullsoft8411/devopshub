import { Menu, Home, BookOpen, Flask, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 mr-4" />
            <Link to="/" className="text-xl font-bold text-gray-800">
              DevOps Training Hub
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Home className="h-5 w-5" />} text="Dashboard" />
            <NavLink to="/courses" icon={<BookOpen className="h-5 w-5" />} text="Courses" />
            <NavLink to="/labs" icon={<Flask className="h-5 w-5" />} text="Labs" />
            <NavLink to="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;