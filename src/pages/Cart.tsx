import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-lg">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Shop Now
        </Button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center border p-4 rounded-lg shadow-sm"
          >
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
            <div className="ml-6 flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-indigo-600 font-bold">${item.price}</p>
              <div className="flex items-center mt-2 space-x-2">
                <Button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1">
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button onClick={() => increaseQuantity(item.id)} className="px-2 py-1">
                  +
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 px-2 py-1 bg-red-500 hover:bg-red-600"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
        <Button onClick={() => navigate("/checkout")}>Checkout</Button>
      </div>
    </div>
  );
}
