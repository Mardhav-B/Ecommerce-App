import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, logout, userEmail } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl flex justify-between items-center p-4">
        {}
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          🛍️ ShopX
        </Link>

        {}
        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-indigo-600">
            Products
          </Link>

          {}
          {isAuthenticated && (
            <Link
              to="/wishlist"
              className="relative text-gray-600 hover:text-indigo-600"
              title="Wishlist"
            >
              ❤️
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {wishlist.length}
                </span>
              )}
            </Link>
          )}

          {}
          {isAuthenticated && (
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-indigo-600"
              title="Cart"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {}
          {isAuthenticated && (
            <Link
              to="/order-history"
              className="text-gray-600 hover:text-indigo-600"
            >
              📜 Orders
            </Link>
          )}

          {}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-indigo-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
