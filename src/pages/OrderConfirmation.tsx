import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) return <p className="p-6 text-center">No order found</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-4">Order Confirmed!</h2>
      <p className="mb-2">Order ID: <strong>{order.id}</strong></p>
      <p className="mb-2">Total Amount: <strong>${order.totalAmount.toFixed(2)}</strong></p>
      <p className="mb-4">Payment Method: <strong>{order.paymentMethod}</strong></p>

      <h3 className="text-xl font-semibold mb-2">Shipping Address:</h3>
      <p>{order.shipping.fullName}</p>
      <p>{order.shipping.address}, {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
      <p>Email: {order.shipping.email}</p>
      <p>Phone: {order.shipping.phone}</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Ordered Items:</h3>
      <ul className="space-y-2">
        {order.items.map((item: any) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button onClick={() => navigate("/order-history")}>View Order History</Button>
      </div>
    </div>
  );
}
