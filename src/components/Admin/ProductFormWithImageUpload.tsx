"use client";
import { useState, useEffect } from "react";
import type React from "react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  GetProductsDocument,
} from "@/graphql/generated/graphql";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DollarSign,
  Warehouse,
  Loader2,
  IndianRupee,
  Edit,
  Save,
  Upload,
  Images,
} from "lucide-react";

import ImageUpload from "./ImageUpload";
import BulkImageUpload from "./BulkImageUpload";

interface OptimizedUrls {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
  webp: string;
  avif: string;
}

interface UploadedImage {
  publicId: string;
  originalUrl: string;
  optimizedUrls: OptimizedUrls;
  metadata: {
    width: number;
    height: number;
    format: string;
    bytes: number;
    folder: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  imageUrls: Array<{ url: string; rank: number }>;
  categories: Array<{ id: number; name: string } | null>;
}

interface ProductFormWithImageUploadProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductFormWithImageUpload({
  product,
  onSuccess,
  onCancel,
}: ProductFormWithImageUploadProps) {
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [stock, setStock] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [activeUploadTab, setActiveUploadTab] = useState("single");

  const isEditing = !!product;

  // GraphQL Queries and Mutations
  const { data: categoriesData } = useGetCategoriesQuery();
  const [createProduct, { loading: createLoading }] = useCreateProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
  });
  const [updateProduct, { loading: updateLoading }] = useUpdateProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
  });

  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((product.price / 100).toString());
      setCurrency(product.currency);
      setStock(product.stock.toString());
      setCategoryIds(
        product.categories
          ?.filter((cat) => cat !== null)
          .map((cat) => cat!.id) || []
      );

      // Convert existing image URLs to UploadedImage format for display
      const existingImages: UploadedImage[] = product.imageUrls.map(
        (img, index) => ({
          publicId: `existing-${index}`,
          originalUrl: img.url,
          optimizedUrls: {
            original: img.url,
            thumbnail: img.url,
            medium: img.url,
            large: img.url,
            webp: img.url,
            avif: img.url,
          },
          metadata: {
            width: 0,
            height: 0,
            format: "jpg",
            bytes: 0,
            folder: "existing",
          },
        })
      );
      setUploadedImages(existingImages);
    }
  }, [product]);

  const handleCategoryToggle = (categoryId: number) => {
    setCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleImagesUploaded = (images: UploadedImage[]) => {
    setUploadedImages(images);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert uploaded images to the format expected by GraphQL
      const imageUrls = uploadedImages.map((img, index) => ({
        url: img.optimizedUrls.medium || img.originalUrl,
        rank: index + 1,
      }));

      const productData = {
        name,
        description,
        price: Math.round(Number.parseFloat(price) * 100), // Convert to cents
        currency,
        stock: Number.parseInt(stock),
        categoryIds,
        imageUrls,
      };

      if (isEditing && product) {
        await updateProduct({
          variables: {
            updateProductInput: { ...productData, id: product.id },
          },
        });
        alert("Product updated successfully!");
      } else {
        await createProduct({
          variables: {
            createProductInput: productData,
          },
        });
        alert("Product created successfully!");
      }

      onSuccess();
    } catch (err) {
      console.error(
        `Failed to ${isEditing ? "update" : "create"} product`,
        err
      );
      alert(
        `Error: ${
          err instanceof Error ? err.message : "An unknown error occurred"
        }`
      );
    }
  };

  const isLoading = createLoading || updateLoading;

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          {isEditing ? (
            <>
              <Edit className="h-5 w-5" />
              Edit Product
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Add New Product
            </>
          )}
        </CardTitle>
        {isEditing && (
          <p className="text-sm text-gray-600">
            Editing: <span className="font-medium text-green-700">{name}</span>
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Product Name *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                {currency === "INR" ? (
                  <IndianRupee className="h-4 w-4 text-green-600" />
                ) : (
                  <DollarSign className="h-4 w-4 text-green-600" />
                )}
                Price *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24 border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="border-green-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Warehouse className="h-4 w-4 text-green-600" />
              Stock Quantity *
            </Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity"
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Categories
            </Label>
            <div className="flex flex-wrap gap-2">
              {categoriesData?.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    categoryIds.includes(category.id) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-colors ${
                    categoryIds.includes(category.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-300 text-green-700 hover:bg-green-50"
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Product Images
            </Label>

            <Tabs value={activeUploadTab} onValueChange={setActiveUploadTab}>
              <TabsList className="bg-green-50">
                <TabsTrigger
                  value="single"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Single Upload
                </TabsTrigger>
                <TabsTrigger
                  value="bulk"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  <Images className="h-4 w-4 mr-2" />
                  Bulk Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="mt-4">
                <ImageUpload
                  onImagesUploaded={handleImagesUploaded}
                  category="product"
                  maxFiles={10}
                  existingImages={uploadedImages}
                />
              </TabsContent>

              <TabsContent value="bulk" className="mt-4">
                <BulkImageUpload
                  onImagesUploaded={handleImagesUploaded}
                  category="product"
                  maxFiles={10}
                />
              </TabsContent>
            </Tabs>
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
                  {isEditing ? "Updating Product..." : "Adding Product..."}
                </>
              ) : (
                <>
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Product
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
