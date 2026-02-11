import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function Checkout() {
  const { cart, totalAmount } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart,
      totalAmount,
      shipping: { fullName, email, phone, address, city, state, pincode },
      paymentMethod: "Cash on Delivery",
      status: "Confirmed",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    localStorage.removeItem("cart");
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
        </div>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mt-6">
        <p className="text-lg font-bold mb-2">Payment Method: Cash on Delivery</p>
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
}
