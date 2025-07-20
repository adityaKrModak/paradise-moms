"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Loader2,
  Plus,
  Clock,
  AlertCircle,
  Lock,
  Wallet,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
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
import { useCreatePaymentIntentMutation } from "@/graphql/generated/graphql";
import { toast } from "sonner";

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

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  processingFee?: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartCount);

  // Pricing calculations
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
  // const tax = Math.round(subtotal * 0.18); // 18% GST
  const discount = 0; // Can be dynamic based on promo codes
  const total = subtotal + shipping - discount;

  const { data: meData, loading: meLoading } = useMeQuery();
  const [addAddress, { loading: addAddressLoading }] = useAddAddressMutation();
  const [updateAddress, { loading: updateAddressLoading }] =
    useUpdateAddressMutation();
  const [createOrder, { loading: createOrderLoading }] =
    useCreateOrderMutation();
  const [createPaymentIntent, { loading: createPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("razorpay");
  const [orderNotes, setOrderNotes] = useState("");

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

  const paymentMethods: PaymentMethod[] = [
    {
      id: "razorpay",
      name: "Online Payment",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      description: "Credit/Debit Card, UPI, Net Banking, Wallets",
    },
  ];

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // useEffect(() => {
  //   if (items.length === 0) {
  //     router.push("/cart");
  //   }
  // }, [items.length, router]);

  useEffect(() => {
    if (meData?.me?.addresses && meData.me.addresses.length > 0) {
      const defaultAddress =
        meData.me.addresses.find(
          (addr) => (addr as GraphQLAddressType).addressType === "PRIMARY"
        ) || meData.me.addresses[0];
      if (defaultAddress) {
        setSelectedAddressId((defaultAddress as GraphQLAddressType).id);
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

  const validateStep = (step: number) => {
    if (step === 1) {
      return (
        !!selectedAddressId ||
        (showAddAddressForm &&
          newAddress.fullName &&
          newAddress.street &&
          newAddress.city &&
          newAddress.state &&
          newAddress.zip &&
          newAddress.country)
      );
    }
    if (step === 2) {
      return !!selectedPaymentMethod;
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
      const { addressType, ...restOfNewAddress } = newAddress;

      if (editingAddressId) {
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

  const initializeRazorpayPayment = async (
    gatewayIntentId: string,
    orderId: string,
    amount: number
  ) => {
    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_key", // Replace with your Razorpay key
      amount: amount, // Amount already in paise
      currency: "INR",
      name: "Paradise Moms",
      description: `Order #${orderId}`,
      order_id: gatewayIntentId, // Use gatewayIntentId instead of orderId
      handler: async (response: any) => {
        try {
          console.log("Payment completed:", response);
          toast.success("Payment completed! Verifying...");
          dispatch(clearCart());

          // Redirect to payment verification page instead of direct success
          router.push(
            `/payment/verifying?orderId=${orderId}&paymentId=${response.razorpay_payment_id}`
          );
        } catch (error) {
          console.error("Payment processing error:", error);
          toast.error("Payment processing failed. Please contact support.");
        } finally {
          setIsProcessingPayment(false);
        }
      },
      prefill: {
        name: `${meData?.me?.firstName || ""} ${
          meData?.me?.lastName || ""
        }`.trim(),
        email: meData?.me?.email || "",
        contact: newAddress.phoneNumber || "",
      },
      theme: {
        color: "#00B207",
      },
      modal: {
        ondismiss: () => {
          setIsProcessingPayment(false);
          toast.error("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/products");
      return;
    }

    const orderItemsInput: CreateOrderItemInput[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const finalTotal = total;

    const createOrderInput: CreateOrderInput = {
      addressId: selectedAddressId,
      orderItems: orderItemsInput,
      currency: "INR",
    };

    setIsProcessingPayment(true);
    try {
      // First create the order
      const { data: orderData } = await createOrder({
        variables: { createOrderInput },
      });

      if (orderData?.createOrder) {
        // Then create payment intent with the order ID
        const { data: paymentIntentData } = await createPaymentIntent({
          variables: {
            createPaymentIntentInput: {
              orderId: orderData.createOrder.id,
              amount: finalTotal,
              currency: "INR",
              gatewayId: 1, // Razorpay gateway ID
              email: meData?.me?.email || "",
            },
          },
        });

        if (paymentIntentData?.createPaymentIntent?.gatewayIntentId) {
          // Initialize Razorpay payment with gatewayIntentId
          await initializeRazorpayPayment(
            paymentIntentData.createPaymentIntent.gatewayIntentId,
            orderData.createOrder.id.toString(),
            paymentIntentData.createPaymentIntent.amount
          );
        } else {
          throw new Error("Failed to create payment intent");
        }
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const addressForReview = meData?.me?.addresses?.find(
    (addr) => addr.id === selectedAddressId
  );

  const finalTotal = total;

  if (items.length === 0 && !meLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart to proceed with checkout.
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-green-600 hover:bg-green-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/cart")}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-green-800">
                Secure Checkout
              </h1>
              <p className="text-gray-600 mt-2">
                {itemCount} {itemCount === 1 ? "item" : "items"} • Total: ₹
                {finalTotal.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, title: "Address", icon: MapPin },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Review", icon: CheckCircle },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-green-600 border-green-600 text-white shadow-lg"
                      : currentStep === step
                      ? "border-green-400 text-green-600 bg-green-50"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    currentStep >= step ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {title}
                </span>
                {step < 3 && <div className="w-16 h-px bg-gray-300 mx-6" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <Card className="border-green-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {meLoading && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                      <span className="ml-3 text-gray-600">
                        Loading addresses...
                      </span>
                    </div>
                  )}

                  {/* Existing Addresses */}
                  {meData?.me?.addresses &&
                    meData.me.addresses.length > 0 &&
                    !showAddAddressForm && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Select Delivery Address
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddAddressForm(true)}
                            className="border-green-300 text-green-700 hover:bg-green-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Address
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {meData.me.addresses.map((address) => {
                            const addr = address as GraphQLAddressType;
                            return (
                              <div
                                key={addr.id}
                                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                  selectedAddressId === addr.id
                                    ? "border-green-500 bg-green-50 shadow-md"
                                    : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                                }`}
                                onClick={() => setSelectedAddressId(addr.id)}
                              >
                                {selectedAddressId === addr.id && (
                                  <div className="absolute top-3 right-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 fill-current" />
                                  </div>
                                )}

                                <div className="pr-8">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-gray-800">
                                      {addr.fullName}
                                    </h4>
                                    {addr.addressType === "PRIMARY" && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs border-green-300 text-green-700"
                                      >
                                        Primary
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-sm leading-relaxed">
                                    {addr.street}
                                    <br />
                                    {addr.city}, {addr.state} {addr.zip}
                                    <br />
                                    {addr.country}
                                  </p>
                                  {addr.phoneNumber && (
                                    <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {addr.phoneNumber}
                                    </p>
                                  )}
                                </div>

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
                                  }}
                                  className="absolute bottom-3 right-3 text-green-600 hover:bg-green-100"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Add/Edit Address Form */}
                  {((meData?.me?.addresses &&
                    meData.me.addresses.length === 0) ||
                    showAddAddressForm) && (
                    <div className="space-y-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {editingAddressId
                            ? "Edit Address"
                            : "Add Delivery Address"}
                        </h3>
                        {showAddAddressForm &&
                          meData?.me?.addresses &&
                          meData.me.addresses.length > 0 && (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setShowAddAddressForm(false);
                                setEditingAddressId(null);
                                setSelectedAddressId(
                                  meData.me.addresses?.[0]?.id || null
                                );
                              }}
                              className="text-gray-600 hover:bg-gray-100"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="fullName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            value={newAddress.fullName}
                            onChange={(e) =>
                              handleNewAddressChange("fullName", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phoneNumber"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            value={newAddress.phoneNumber}
                            onChange={(e) =>
                              handleNewAddressChange(
                                "phoneNumber",
                                e.target.value
                              )
                            }
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="street"
                          className="text-sm font-medium text-gray-700"
                        >
                          Street Address *
                        </Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) =>
                            handleNewAddressChange("street", e.target.value)
                          }
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="House number, street name, area"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="city"
                            className="text-sm font-medium text-gray-700"
                          >
                            City *
                          </Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) =>
                              handleNewAddressChange("city", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="state"
                            className="text-sm font-medium text-gray-700"
                          >
                            State *
                          </Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) =>
                              handleNewAddressChange("state", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="zip"
                            className="text-sm font-medium text-gray-700"
                          >
                            PIN Code *
                          </Label>
                          <Input
                            id="zip"
                            value={newAddress.zip}
                            onChange={(e) =>
                              handleNewAddressChange("zip", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="PIN Code"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSaveAddress}
                        disabled={addAddressLoading || updateAddressLoading}
                        className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                      >
                        {addAddressLoading || updateAddressLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {editingAddressId
                              ? "Update Address"
                              : "Save Address"}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="border-green-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedPaymentMethod === method.id
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        {selectedPaymentMethod === method.id && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="h-5 w-5 text-green-600 fill-current" />
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div className="mt-1">{method.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {method.name}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {method.description}
                            </p>
                            {method.processingFee && (
                              <p className="text-orange-600 text-xs mt-1">
                                + ₹{method.processingFee} processing fee
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Notes */}
                  <div className="pt-4 border-t border-gray-200">
                    <Label
                      htmlFor="orderNotes"
                      className="text-sm font-medium text-gray-700"
                    >
                      Order Notes (Optional)
                    </Label>
                    <Textarea
                      id="orderNotes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <Card className="border-green-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {/* Delivery Address */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </h4>
                    {addressForReview ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-800">
                          {(addressForReview as GraphQLAddressType).fullName}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {(addressForReview as GraphQLAddressType).street}
                          <br />
                          {(addressForReview as GraphQLAddressType).city},{" "}
                          {(addressForReview as GraphQLAddressType).state}{" "}
                          {(addressForReview as GraphQLAddressType).zip}
                          <br />
                          {(addressForReview as GraphQLAddressType).country}
                        </p>
                        {(addressForReview as GraphQLAddressType)
                          .phoneNumber && (
                          <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {
                              (addressForReview as GraphQLAddressType)
                                .phoneNumber
                            }
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-600">No address selected</p>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Method
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {paymentMethods.find(
                        (m) => m.id === selectedPaymentMethod
                      ) && (
                        <div className="flex items-center gap-3">
                          {
                            paymentMethods.find(
                              (m) => m.id === selectedPaymentMethod
                            )?.icon
                          }
                          <div>
                            <p className="font-medium text-gray-800">
                              {
                                paymentMethods.find(
                                  (m) => m.id === selectedPaymentMethod
                                )?.name
                              }
                            </p>
                            <p className="text-gray-600 text-sm">
                              {
                                paymentMethods.find(
                                  (m) => m.id === selectedPaymentMethod
                                )?.description
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Order Items ({itemCount})
                    </h4>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border">
                            {item.imageUrls?.[0]?.url ? (
                              <Image
                                src={item.imageUrls[0].url}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800">
                              {item.name}
                            </h5>
                            <p className="text-gray-600 text-sm">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              ₹{((item.price / 100) * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-gray-500 text-sm">
                              ₹{(item.price / 100).toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Notes */}
                  {orderNotes && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Order Notes
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 text-sm">{orderNotes}</p>
                      </div>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">
                          Please review your order carefully
                        </p>
                        <p>
                          By placing this order, you agree to our Terms of
                          Service and Privacy Policy. Your payment will be
                          processed securely.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-green-100 sticky top-4 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="text-green-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {/* Items Preview */}
                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.imageUrls?.[0]?.url ? (
                          <Image
                            src={item.imageUrls[0].url}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-gray-400" />
                        )}
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
                    <p className="text-sm text-gray-600 text-center py-2">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({itemCount} items)
                    </span>
                    <span>₹{(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div> */}

                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{(finalTotal / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-sm text-green-600">Few business days</p>
                  <div className="flex items-center gap-2 text-xs text-green-600 mt-2">
                    <Clock className="h-3 w-3" />
                    <span>Order by 6 PM for next day processing</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <Lock className="h-3 w-3" />
                  <span>Secured by SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <Button
              onClick={handleNextStep}
              disabled={!validateStep(currentStep)}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Continue
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessingPayment || createOrderLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isProcessingPayment || createOrderLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Place Order - ₹{(finalTotal / 100).toFixed(2)}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
