import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/redux/slices/cartSlice";

interface CartItemsProps {
  items: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  items,
  updateQuantity,
  removeItem,
}) => {
  return (
    <Card className="overflow-hidden bg-white shadow-lg h-full border border-gray-100 rounded-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm border-b bg-gradient-to-r py-2 from-[#F8FAF7] to-white">
              <th className="text-left p-6 text-gray-600 font-medium">
                PRODUCT
              </th>
              <th className="text-left p-6 text-gray-600 font-medium">PRICE</th>
              <th className="text-left p-6 text-gray-600 font-medium">
                QUANTITY
              </th>
              <th className="text-left p-6 text-gray-600 font-medium">
                SUBTOTAL
              </th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 ">
            {items.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-[#F8FAF7] transition-colors duration-150 !py-10"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                        <Image
                          src={item.imageUrls[0].url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                      </div>
                      {/* {item.discount && (
                        <span className="absolute -top-2 -right-2 bg-[#00B517] text-white text-xs px-2 py-1 rounded-full shadow-lg">
                          -{item.discount}%
                        </span>
                      )} */}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-6 !text-gray-900">₹{item.price.toFixed(2)}</td>
                <td className="p-6">
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#00B517]  transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#00B517] transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="p-6 font-medium text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="p-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CartItems;
