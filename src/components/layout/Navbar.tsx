import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ShopX
        </Link>
        <Link to="/products" className="text-gray-600 hover:text-indigo-600">
          Products
        </Link>
      </div>
    </nav>
  );
}
