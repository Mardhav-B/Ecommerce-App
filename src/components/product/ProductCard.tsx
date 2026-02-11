import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import type { Product } from "@/types/product";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to add items to Wishlist");
      return;
    }
    if (isWishlisted(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to add items to Cart");
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div
      className="relative border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white cursor-pointer flex flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow hover:bg-red-100 text-xl"
        title={isWishlisted(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted(product.id) ? "❤️" : "🤍"}
      </button>

      {}
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
          <p className="mt-2 text-indigo-600 font-bold text-lg">${product.price}</p>
        </div>

        {}
        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700"
        >
          🛒 Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
