import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/redux/slices/cartSlice";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  const shipping: number = 0; // Assuming free shipping for now

  return (
    <section className="md:w-[25vw]">
      <h2 className="text-2xl font-medium mb-6">Order Summary</h2>

      <div className=" bg-[#fefefe] rounded-lg p-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={item.imageUrls[0].url}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <div className="font-medium">
                  {item.name} x{item.quantity}
                </div>
              </div>
            </div>
            <div className="font-medium">₹{item.price.toFixed(2)}</div>
          </div>
        ))}

        <div className="space-y-2 pt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between pt-2">
            <span>Total:</span>
            <span className="font-medium">
              ₹{(total + shipping).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <Button className="w-full h-12 bg-[#00B517] hover:bg-[#00B517]/90 mt-5">
        Place Order
      </Button>
    </section>
  );
};

export default OrderSummary;
