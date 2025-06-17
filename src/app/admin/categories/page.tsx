"use client";
import { useState } from "react";
import type React from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
  GetCategoriesDocument,
} from "@/graphql/generated/graphql";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FolderTree, Edit, Trash2, Loader2, Save } from "lucide-react";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("manage");

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [createCategory, { loading: createLoading, error: createError }] =
    useCreateCategoryMutation({
      refetchQueries: [{ query: GetCategoriesDocument }],
    });

  const [removeCategory, { loading: removeLoading, error: removeError }] =
    useRemoveCategoryMutation({
      refetchQueries: [{ query: GetCategoriesDocument }],
    });

  const [updateCategory, { loading: updateLoading, error: updateError }] =
    useUpdateCategoryMutation({
      refetchQueries: [{ query: GetCategoriesDocument }],
    });

  const resetForm = () => {
    setName("");
    setDescription("");
    setIsEditing(false);
    setEditingCategoryId(null);
  };

  const handleEditClick = (category: {
    id: number;
    name: string;
    description?: string | null;
  }) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setName(category.name);
    setDescription(category.description || "");
    setActiveTab("add");
  };

  const handleCancelEdit = () => {
    resetForm();
    setActiveTab("manage");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("Category name is required.");
      return;
    }
    try {
      if (isEditing && editingCategoryId) {
        await updateCategory({
          variables: {
            updateCategoryInput: {
              id: editingCategoryId,
              name,
              description,
            },
          },
        });
        alert("Category updated successfully!");
      } else {
        await createCategory({
          variables: {
            createCategoryInput: {
              name,
              description,
            },
          },
        });
        alert("Category created successfully!");
      }
      resetForm();
      setActiveTab("manage");
    } catch (err) {
      console.error(
        `Failed to ${isEditing ? "update" : "create"} category:`,
        err
      );
      const errorMessage =
        updateError?.message ||
        createError?.message ||
        (err instanceof Error ? err.message : "An unknown error occurred");
      alert(
        `Error ${isEditing ? "updating" : "creating"} category: ${errorMessage}`
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await removeCategory({
          variables: {
            id,
          },
        });
        alert("Category deleted successfully!");
      } catch (err) {
        console.error("Failed to delete category:", err);
        const errorMessage =
          removeError?.message ||
          (err instanceof Error ? err.message : "An unknown error occurred");
        alert(`Error deleting category: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Categories</h1>
          <p className="text-gray-600 mt-2">
            Organize your products into categories
          </p>
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
            <FolderTree className="h-4 w-4 mr-2" />
            Manage Categories
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            {isEditing ? (
              <Edit className="h-4 w-4 mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {isEditing ? "Edit Category" : "Add Category"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                {isEditing ? (
                  <Edit className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                {isEditing ? "Edit Category" : "Add New Category"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="categoryName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category Name *
                  </Label>
                  <Input
                    id="categoryName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="categoryDescription"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="categoryDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter category description"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createLoading || updateLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {createLoading || updateLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        {isEditing ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>
                        {isEditing ? (
                          <Save className="h-4 w-4 mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {isEditing ? "Update Category" : "Add Category"}
                      </>
                    )}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={createLoading || updateLoading}
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
              <CardTitle className="text-green-800 flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Existing Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              {categoriesLoading && (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              )}
              {categoriesError && (
                <p className="text-red-500">
                  Error loading categories: {categoriesError.message}
                </p>
              )}
              {!categoriesLoading && !categoriesError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoriesData?.categories.map((category) => (
                    <Card
                      key={category.id}
                      className="border-green-100 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-800">
                            {category.name}
                          </h3>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:bg-green-50"
                              onClick={() => handleEditClick(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(category.id)}
                              disabled={removeLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
