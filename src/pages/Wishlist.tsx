import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlist.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-lg">Your wishlist is empty.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-sm">
            <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="text-indigo-600 font-bold">${item.price}</p>
            <div className="mt-2 flex space-x-2">
              <Button
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
                className="flex-1"
              >
                Move to Cart
              </Button>
              <Button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
