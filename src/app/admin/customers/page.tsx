"use client";
import { useState } from "react";
import type React from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserByAdminMutation,
  GetUsersDocument,
  UserRole,
} from "@/graphql/generated/graphql";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Users,
  Loader2,
  Edit,
  Save,
  ArrowLeft,
  User,
} from "lucide-react";
import Image from "next/image";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function CustomersPage() {
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.User);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("manage");

  // GraphQL Queries and Mutations
  const { data: usersData, loading: usersLoading } = useGetUsersQuery();
  const [createUser, { loading: createLoading }] = useCreateUserMutation({
    refetchQueries: [{ query: GetUsersDocument }],
  });
  const [updateUser, { loading: updateLoading }] = useUpdateUserByAdminMutation(
    {
      refetchQueries: [{ query: GetUsersDocument }],
    }
  );

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    // setPassword("");
    setRole(UserRole.User);
    setIsEditing(false);
    setEditingUserId(null);
  };

  const populateFormForEdit = (user: User) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setRole(user.role as UserRole);
    setIsEditing(true);
    setEditingUserId(user.id);
    setActiveTab("add"); // Switch to the form tab
  };

  const handleEdit = (user: User) => {
    populateFormForEdit(user);
  };

  const handleCancelEdit = () => {
    resetForm();
    setActiveTab("manage"); // Switch back to manage tab
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userInput = {
        firstName,
        lastName,
        email,
        // role,
      };

      if (isEditing && editingUserId) {
        await updateUser({
          variables: {
            updateUserInput: { ...userInput, id: editingUserId },
          },
        });
        alert("User updated successfully!");
      } else {
        await createUser({
          variables: {
            createUserInput: userInput,
          },
        });
        alert("User created successfully!");
      }
      resetForm();
      setActiveTab("manage");
    } catch (err) {
      console.error(`Failed to ${isEditing ? "update" : "create"} user`, err);
      alert(
        `Error: ${
          err instanceof Error ? err.message : "An unknown error occurred"
        }`
      );
    }
  };

  const isLoading = createLoading || updateLoading;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customers</p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-green-50">
          <TabsTrigger
            value="manage"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            disabled={isEditing}
          >
            <Users className="h-4 w-4 mr-2" />
            Manage Customers
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            {isEditing ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Customer
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Edit className="h-5 w-5" />
                    Edit Customer
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Add New Customer
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* {!isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                )} */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    disabled
                    value={role}
                    onValueChange={(value) => setRole(value as UserRole)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.User}>Customer</SelectItem>
                      <SelectItem value={UserRole.Admin}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        {isEditing
                          ? "Updating Customer..."
                          : "Adding Customer..."}
                      </>
                    ) : (
                      <>
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Customer
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Customer
                          </>
                        )}
                      </>
                    )}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">All Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 bg-gray-50">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">Joined</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8">
                          <Loader2 className="h-8 w-8 text-green-600 animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : (
                      usersData?.users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">{`${user.firstName} ${user.lastName}`}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                user.role === "ADMIN"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(user as User)}
                              className="mr-2"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
