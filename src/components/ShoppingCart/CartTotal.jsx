import React from 'react'

import {  Leaf} from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'
function cartTotal({subtotal,shipping,total}) {
  return (
    <div className="lg:col-span-1">
  <Card className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden">
    <div className="bg-gradient-to-b from-[#F8FAF7] to-white p-6 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900">Cart Total</h2>
        <Leaf className="h-4 w-4 text-[#00B517]" />
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between py-3 border-b border-dashed">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-dashed">
        <span className="text-gray-600">Shipping:</span>
        <span className="text-[#00B517] font-medium">{shipping}</span>
      </div>
      <div className="flex justify-between py-3">
        <span className="text-lg font-bold text-gray-900">Total:</span>
        <span className="text-lg font-bold text-gray-900">₹{total.toFixed(2)}</span>
      </div>
      <Button className="w-full bg-[#00B517] hover:bg-[#00A515] text-white text-lg h-12 shadow-md hover:shadow-lg transition-all">
        Proceed to checkout
      </Button>
      <div className="mt-6 bg-[#F8FAF7] rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Leaf className="h-4 w-4 text-[#00B517]" />
          <span>We deliver, you enjoy</span>
        </div>
      </div>
    </div>
  </Card>
</div>

  )
}

export default cartTotal
