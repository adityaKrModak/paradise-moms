"use client";
import React, { useState, useEffect } from "react";
import {
  useMeQuery,
  useUpdateUserMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  Shield,
  Calendar,
  MapPin,
  Camera,
  Package,
  Heart,
  CreditCard,
} from "lucide-react";

export default function ProfilePage() {
  const { data, loading, error } = useMeQuery();
  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useUpdateUserMutation({
      refetchQueries: ["Me"],
    });
  const [addAddress, { loading: addAddressLoading, error: addAddressError }] =
    useAddAddressMutation({
      refetchQueries: ["Me"],
    });
  const [
    updateAddress,
    { loading: updateAddressLoading, error: updateAddressError },
  ] = useUpdateAddressMutation({
    refetchQueries: ["Me"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const user = data?.me;
  const updateLoading =
    updateUserLoading || addAddressLoading || updateAddressLoading;
  const updateError = updateUserError || addAddressError || updateAddressError;

  const userAddress = user?.addresses?.[0];

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      if (userAddress) {
        setAddress({
          street: userAddress.street || "",
          city: userAddress.city || "",
          state: userAddress.state || "",
          zip: userAddress.zip || "",
          country: userAddress.country || "India",
        });
      }
    }
  }, [user, userAddress]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Error Loading Profile
            </h3>
            <p className="text-red-600 text-sm mb-4">{error.message}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Profile Not Found
            </h3>
            <p className="text-gray-600 text-sm">
              We couldn't find your profile information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    updateUser({
      variables: {
        updateUserInput: {
          id: user.id,
          firstName,
          lastName,
          phoneNumber,
        },
      },
    });

    if (userAddress) {
      updateAddress({
        variables: {
          updateAddressInput: {
            id: userAddress.id,
            ...address,
          },
        },
      });
    } else {
      addAddress({
        variables: {
          createAddressInput: address,
        },
      });
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setPhoneNumber(user.phoneNumber || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      if (userAddress) {
        setAddress({
          street: userAddress.street || "",
          city: userAddress.city || "",
          state: userAddress.state || "",
          zip: userAddress.zip || "",
          country: userAddress.country || "India",
        });
      } else {
        setAddress({
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "India",
        });
      }
    }
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const initial = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  const displayAddress = userAddress
    ? `${userAddress.street}, ${userAddress.city}, ${userAddress.state} ${userAddress.zip}, ${userAddress.country}`
    : "Not provided";

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] md:pt-[140px]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card className="border-green-100 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 border-4 border-green-100">
                      <AvatarImage alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-xl font-semibold">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                  <Badge className={`${getRoleBadgeColor(user.role)} border`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                  </Badge>
                </div>

                <Separator className="my-6" />

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-green-600" />
                      Member since
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="h-4 w-4 text-green-600" />
                      Total Orders
                    </div>
                    <span className="text-sm font-medium text-green-700">
                      {user.orders?.length ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Heart className="h-4 w-4 text-orange-500" />
                      Favorites
                    </div>
                    <span className="text-sm font-medium text-orange-600">
                      0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-green-50">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Order History
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-800 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      {!isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium text-gray-700"
                        >
                          First Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                            {user.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                            {user.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        Email Address
                      </Label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-green-600" />
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                          {user.phoneNumber || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4 text-green-600" />
                        Address
                      </Label>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                              id="street"
                              value={address.street}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  street: e.target.value,
                                })
                              }
                              placeholder="123 Main St"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                value={address.city}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    city: e.target.value,
                                  })
                                }
                                placeholder="Anytown"
                                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State / Province</Label>
                              <Input
                                id="state"
                                value={address.state}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    state: e.target.value,
                                  })
                                }
                                placeholder="CA"
                                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP / Postal Code</Label>
                              <Input
                                id="zip"
                                value={address.zip}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    zip: e.target.value,
                                  })
                                }
                                placeholder="12345"
                                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Input
                                id="country"
                                value={address.country}
                                disabled
                                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                          {displayAddress}
                        </p>
                      )}
                    </div>
                    {updateError && (
                      <p className="text-sm text-red-500 mt-2">
                        {updateError.message}
                      </p>
                    )}
                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSave}
                          disabled={updateLoading}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {updateLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={updateLoading}
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Order History Tab */}
              <TabsContent value="orders">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Order History
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Your order history will appear here
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Browse Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Account Settings
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Manage your account preferences and security settings
                      </p>
                      <Button
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
