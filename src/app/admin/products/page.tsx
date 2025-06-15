"use client";
import { useState } from "react";
import type React from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useRemoveProductMutation,
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
  Package,
  ImageIcon,
  X,
  DollarSign,
  Warehouse,
  Loader2,
  Trash2,
  IndianRupee,
} from "lucide-react";
import Image from "next/image";

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [stock, setStock] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState([{ url: "", rank: 1 }]);

  // GraphQL Queries and Mutations
  const { data: productsData, loading: productsLoading } =
    useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [createProduct, { loading: createLoading }] = useCreateProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
  });
  const [removeProduct, { loading: removeLoading }] = useRemoveProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
  });

  const handleImageChange = (
    index: number,
    field: "url" | "rank",
    value: string
  ) => {
    const newImageUrls = [...imageUrls];
    if (field === "rank") {
      newImageUrls[index][field] = Number.parseInt(value) || 1;
    } else {
      newImageUrls[index][field] = value;
    }
    setImageUrls(newImageUrls);
  };

  const addImage = () => {
    setImageUrls([...imageUrls, { url: "", rank: imageUrls.length + 1 }]);
  };

  const removeImage = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryIds([]);
    setImageUrls([{ url: "", rank: 1 }]);
    setCurrency("INR");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          createProductInput: {
            name,
            description,
            price: Math.round(parseFloat(price) * 100), // Convert to cents
            currency,
            stock: Number.parseInt(stock),
            categoryIds,
            imageUrls,
          },
        },
      });
      alert("Product created successfully!");
      resetForm();
    } catch (err) {
      console.error("Failed to create product", err);
      alert(
        `Error: ${
          err instanceof Error ? err.message : "An unknown error occurred"
        }`
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await removeProduct({ variables: { id } });
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Failed to delete product", err);
        alert(
          `Error: ${
            err instanceof Error ? err.message : "An unknown error occurred"
          }`
        );
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
      </div>

      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList className="bg-green-50">
          <TabsTrigger
            value="manage"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Package className="h-4 w-4 mr-2" />
            Manage Products
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </CardTitle>
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
                          categoryIds.includes(category.id)
                            ? "default"
                            : "outline"
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

                {/* Images */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-green-600" />
                    Product Images
                  </Label>
                  {imageUrls.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Image URL"
                        value={image.url}
                        onChange={(e) =>
                          handleImageChange(index, "url", e.target.value)
                        }
                        className="border-green-200 flex-grow"
                      />
                      <Input
                        type="number"
                        placeholder="Rank"
                        value={image.rank}
                        onChange={(e) =>
                          handleImageChange(index, "rank", e.target.value)
                        }
                        className="border-green-200 w-20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                        disabled={imageUrls.length <= 1}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImage}
                    className="border-green-300 text-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add another image
                  </Button>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {createLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Existing Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsData?.products.map((product) => (
                    <Card
                      key={product.id}
                      className="border-green-100 overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={product.imageUrls[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(product.id)}
                            disabled={removeLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-green-600 font-medium mt-1">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: product.currency,
                          }).format(product.price / 100)}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.categories?.filter(isNotNull).map((cat) => (
                            <Badge
                              key={cat.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {cat.name}
                            </Badge>
                          ))}
                        </div>
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
