import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
  } = useCart();

  if (cart.length === 0)
    return <p className="p-6 text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-24 object-contain"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-indigo-600 font-bold">${item.price}</p>
              <div className="flex items-center mt-2">
                <Button
                  className="px-3 py-1 text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-none"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <span className="px-4">{item.quantity}</span>
                <Button
                  className="px-3 py-1 text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-none"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                className="mt-2 bg-red-500 hover:bg-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end items-center space-x-6">
        <p className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
        <Button
          className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700"
          onClick={() => alert("Proceeding to checkout...")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
