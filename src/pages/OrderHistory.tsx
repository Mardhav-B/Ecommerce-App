import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0)
    return <p className="p-6 text-center">You have no orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Order History</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
            <ul className="mb-2 space-y-1">
              {order.items.map((item: any) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
