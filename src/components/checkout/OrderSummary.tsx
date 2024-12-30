import React from 'react'
import { useState } from 'react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

function OrderSummary() {
  const [items] = useState([
    {
      id: '1',
      name: 'Green Capsicum',
      price: 70.00,
      quantity: 5,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Red Capsicum',
      price: 14.00,
      quantity: 1,
      image: '/placeholder.svg'
    }
  ])

  return (
    <section className="md:w-[25vw]">
          <h2 className="text-2xl font-medium mb-6">Order Summery</h2>

          
          <div className=" bg-[#fefefe] rounded-lg p-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
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
                <div className="font-medium">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}

            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$84.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Total:</span>
                <span className="font-medium">$84.00</span>
              </div>
            </div>

          </div>
            <Button className="w-full h-12 bg-[#00B517] hover:bg-[#00B517]/90 mt-5">
              Place Order
            </Button>
      
    </section>
  )
}

export default OrderSummary
