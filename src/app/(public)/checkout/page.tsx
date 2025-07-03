"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
  Edit,
  Truck,
  Package,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import {
  selectCartItems,
  selectCartTotal,
} from "@/redux/selectors/cartSelectors";
import { clearCart } from "@/redux/slices/cartSlice";
import {
  useMeQuery,
  MeDocument,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useCreateOrderMutation,
  type CreateOrderInput,
  type CreateOrderItemInput,
  type UpdateAddressInput,
  type Address as GraphQLAddressType,
  AddressType,
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

interface NewAddressFormState {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phoneNumber?: string;
  addressType: AddressType;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  const [addAddress, { loading: addAddressLoading }] = useAddAddressMutation();
  const [updateAddress, { loading: updateAddressLoading }] =
    useUpdateAddressMutation();
  const [createOrder, { loading: createOrderLoading }] =
    useCreateOrderMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const [newAddress, setNewAddress] = useState<NewAddressFormState>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    phoneNumber: "",
    addressType: AddressType.Primary,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  useEffect(() => {
    if (meData?.me?.addresses && meData.me.addresses.length > 0) {
      const defaultAddress =
        meData.me.addresses.find(
          (addr) => (addr as GraphQLAddressType).addressType === "PRIMARY"
        ) || meData.me.addresses[0];
      if (defaultAddress) {
        setSelectedAddressId((defaultAddress as GraphQLAddressType).id);
        setShowAddAddressForm(false);
      }
    } else if (
      meData?.me &&
      (!meData.me.addresses || meData.me.addresses.length === 0)
    ) {
      setShowAddAddressForm(true);
    }
  }, [meData]);

  const handleNewAddressChange = (
    field: keyof NewAddressFormState,
    value: string
  ) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!showAddAddressForm) {
        return !!selectedAddressId;
      }
      const requiredFields: (keyof NewAddressFormState)[] = [
        "fullName",
        "street",
        "city",
        "state",
        "zip",
        "country",
      ];
      return requiredFields.every(
        (field) =>
          newAddress[field] && (newAddress[field] as string).trim() !== ""
      );
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.error("Please complete all required fields before proceeding.");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSaveAddress = async () => {
    const { addressType, ...restOfNewAddress } = newAddress;
    if (
      !newAddress.fullName ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zip ||
      !newAddress.country
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    try {
      if (editingAddressId) {
        // Update existing address
        const updateAddressInput: UpdateAddressInput = {
          id: editingAddressId,
          ...restOfNewAddress,
          addressType: newAddress.addressType,
        };

        const { data: updatedAddressData } = await updateAddress({
          variables: { updateAddressInput },
          refetchQueries: [{ query: MeDocument }],
        });

        if (updatedAddressData?.updateAddress) {
          toast.success("Address updated successfully!");
          setSelectedAddressId(updatedAddressData.updateAddress.id);
          setShowAddAddressForm(false);
          setEditingAddressId(null);
        }
      } else {
        // Create new address
        const { data: newAddressData } = await addAddress({
          variables: {
            createAddressInput: {
              ...restOfNewAddress,
              addressType: newAddress.addressType,
            },
          },
          refetchQueries: [{ query: MeDocument }],
        });

        if (newAddressData?.addAddress) {
          toast.success("Address saved successfully!");
          setSelectedAddressId(newAddressData.addAddress.id);
          setShowAddAddressForm(false);
        }
      }
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (items.length === 0) {
      toast.error(
        "Your cart is empty. Please add items to your cart before placing an order."
      );
      router.push("/products");
      return;
    }

    const orderItemsInput: CreateOrderItemInput[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const createOrderInput: CreateOrderInput = {
      addressId: selectedAddressId,
      orderItems: orderItemsInput,
      currency: "INR",
    };

    const loadingToastId = toast.loading("Placing your order...");

    try {
      const { data: orderData, errors } = await createOrder({
        variables: { createOrderInput },
      });

      toast.dismiss(loadingToastId);

      if (errors) {
        console.error("GraphQL errors placing order:", errors);
        toast.error("Failed to place order.", {
          description: errors.map((e) => e.message).join(", "),
        });
        return;
      }

      if (orderData?.createOrder?.id) {
        toast.success("Order placed successfully!", {
          description: `Order ID: ${orderData.createOrder.id}. Redirecting...`,
        });
        dispatch(clearCart());
        router.push(`/checkout/success?orderId=${orderData.createOrder.id}`);
      } else {
        throw new Error("Order creation failed or no order ID returned.");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error("Error placing order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error("Failed to place order.", {
        description: errorMessage,
        action: {
          label: "Try Again",
          onClick: () => handlePlaceOrder(),
        },
      });
    }
  };

  const addressForReview = meData?.me?.addresses?.find(
    (addr) => addr.id === selectedAddressId
  );

  if (items.length === 0 && !meLoading && currentStep !== 2) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/cart")}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-green-800">Checkout</h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, title: "Address", icon: MapPin },
              { step: 2, title: "Review", icon: CheckCircle },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {title}
                </span>
                {step < 2 && <div className="w-16 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {meLoading && <p>Loading addresses...</p>}
                  {meError && (
                    <p>
                      Error loading addresses: {meError.message}. Please try
                      again.
                    </p>
                  )}
                  {meData?.me?.addresses &&
                    meData.me.addresses.length > 0 &&
                    !showAddAddressForm && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Select a delivery address:
                        </p>
                        {meData.me.addresses.map((address) => {
                          const addr = address as GraphQLAddressType;
                          return (
                            <div
                              key={addr.id}
                              className={`flex items-center justify-between space-x-2 p-4 border rounded-md cursor-pointer transition-colors ${
                                selectedAddressId === addr.id
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedAddressId(addr.id)}
                            >
                              <Label
                                htmlFor={`addr-${addr.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <p className="font-semibold text-gray-800">
                                  {addr.fullName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {addr.street}, {addr.city}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {addr.state}, {addr.zip}, {addr.country}
                                </p>
                                {addr.phoneNumber && (
                                  <p className="text-sm text-gray-500">
                                    Phone: {addr.phoneNumber}
                                  </p>
                                )}
                              </Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowAddAddressForm(true);
                                  setEditingAddressId(addr.id);
                                  setNewAddress({
                                    fullName: addr.fullName,
                                    street: addr.street,
                                    city: addr.city,
                                    state: addr.state,
                                    zip: addr.zip,
                                    country: addr.country,
                                    phoneNumber: addr.phoneNumber || "",
                                    addressType: addr.addressType,
                                  });
                                  setSelectedAddressId(null);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {((meData?.me?.addresses &&
                    meData.me.addresses.length === 0) ||
                    showAddAddressForm) && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 mt-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {editingAddressId
                          ? "Edit Address"
                          : showAddAddressForm &&
                            meData?.me?.addresses &&
                            meData.me.addresses.length > 0
                          ? "Add New Address"
                          : "Enter Your Delivery Address"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={newAddress.fullName}
                            onChange={(e) =>
                              handleNewAddressChange("fullName", e.target.value)
                            }
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            value={newAddress.phoneNumber}
                            onChange={(e) =>
                              handleNewAddressChange(
                                "phoneNumber",
                                e.target.value
                              )
                            }
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="street">Street Address *</Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) =>
                            handleNewAddressChange("street", e.target.value)
                          }
                          className="border-gray-300 focus:border-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) =>
                              handleNewAddressChange("city", e.target.value)
                            }
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) =>
                              handleNewAddressChange("state", e.target.value)
                            }
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">Postal Code *</Label>
                          <Input
                            id="zip"
                            value={newAddress.zip}
                            onChange={(e) =>
                              handleNewAddressChange("zip", e.target.value)
                            }
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={newAddress.country}
                          onChange={(e) =>
                            handleNewAddressChange("country", e.target.value)
                          }
                          className="border-gray-300 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="addressType">Address Type</Label>
                        <select
                          id="addressType"
                          value={newAddress.addressType}
                          onChange={(e) =>
                            handleNewAddressChange(
                              "addressType",
                              e.target.value as AddressType
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                        >
                          <option value={AddressType.Primary}>Primary</option>
                          <option value={AddressType.Secondary}>
                            Secondary
                          </option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={handleSaveAddress}
                          disabled={addAddressLoading || updateAddressLoading}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {addAddressLoading || updateAddressLoading
                            ? "Saving..."
                            : editingAddressId
                            ? "Update Address & Continue"
                            : "Save Address & Continue"}
                        </Button>
                        {showAddAddressForm &&
                          meData?.me?.addresses &&
                          meData.me.addresses.length > 0 && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowAddAddressForm(false);
                                setEditingAddressId(null);
                                setNewAddress({
                                  fullName: "",
                                  street: "",
                                  city: "",
                                  state: "",
                                  zip: "",
                                  country: "India",
                                  phoneNumber: "",
                                  addressType: AddressType.Primary,
                                });
                                setSelectedAddressId(
                                  meData.me.addresses?.[0]?.id || null
                                );
                              }}
                              className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              Cancel
                            </Button>
                          )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNextStep}
                      disabled={!validateStep(1)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Continue to Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Selected Address:</h4>
                  {addressForReview ? (
                    (() => {
                      const {
                        fullName,
                        street,
                        city,
                        state,
                        zip,
                        country,
                        phoneNumber,
                        addressType,
                      } = addressForReview as GraphQLAddressType;
                      return (
                        <div>
                          <p className="font-semibold">{fullName}</p>
                          <p>
                            {street}, {city}
                          </p>
                          <p>
                            {state}, {zip}, {country}
                          </p>
                          {phoneNumber && (
                            <p className="text-sm text-gray-500">
                              Phone: {phoneNumber}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">
                            Type: {addressType}
                          </p>
                        </div>
                      );
                    })()
                  ) : (
                    <p>No address selected.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-green-100 sticky top-4">
              <CardHeader>
                <CardTitle className="text-green-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ₹{((item.price / 100) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-600 text-center">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    2-3 business days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Previous
            </Button>
          )}
          <div />
          {currentStep < 2 ? (
            <Button
              onClick={handleNextStep}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handlePlaceOrder}
              disabled={createOrderLoading}
              className="bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
            >
              {createOrderLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
