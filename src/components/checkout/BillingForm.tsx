import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function BillingForm() {
  return (
    <section>
     
          <h2 className="text-2xl font-medium mb-6">Billing Information</h2>
          
          <div className="space-y-6 bg-[#fefefe] p-6 rounded-lg ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-1.5">First name</Label>
                <Input 
                  placeholder="Your first name"
                  className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm mb-1.5">Last name</Label>
                <Input 
                  placeholder="Your last name"
                  className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
             
            </div>

            <div>
              <Label className="text-sm mb-1.5">Street Address</Label>
              <Input 
                placeholder="Email"
                className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm mb-1.5">Country / Region</Label>
                <Select>
                  <SelectTrigger className="mt-1.5 border-gray-200 bg-white focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-1.5">States</Label>
                <Select>
                  <SelectTrigger className="mt-1.5 border-gray-200 bg-white focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Selects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-1.5">Zip Code</Label>
                <Input 
                  placeholder="Zip Code"
                  className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-1.5">Email</Label>
                <Input 
                  type="email"
                  placeholder="Email Address"
                  className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm mb-1.5">Phone</Label>
                <Input 
                  type="tel"
                  placeholder="Phone number"
                  className="mt-1.5 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
            </div>

          
          </div>
        
    </section>
  )
}

export default BillingForm
