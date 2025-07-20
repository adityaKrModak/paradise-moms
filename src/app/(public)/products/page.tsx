"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/Common/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Grid, List, SlidersHorizontal, Package } from "lucide-react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  type GetProductsQuery,
  type GetCategoriesQuery,
} from "@/graphql/generated/graphql";

type Product = GetProductsQuery["products"][0];
type Category = GetCategoriesQuery["categories"][0];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  // Handle URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");

    if (urlSearch) {
      setSearchQuery(urlSearch);
    }

    if (urlCategory) {
      setSelectedCategories([urlCategory]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (productsData?.products) {
      const validProducts = productsData.products.filter(
        (p): p is NonNullable<Product> => p !== null
      );
      setProducts(validProducts);
      setFilteredProducts(validProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoriesData?.categories) {
      const validCategories = categoriesData.categories.filter(
        (c): c is NonNullable<Category> => c !== null
      );
      setCategories(validCategories);
    }
  }, [categoriesData]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories?.some((category) =>
          selectedCategories.includes(category?.name || "")
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = product.price / 100;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategories, sortBy, priceRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("name");
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-[140px] md:pt-[140px]">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-[140px] md:pt-[140px]">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-red-600">
                Error loading products. Please try again later.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover our wide range of fresh, organic, and locally sourced
            products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="border-green-100 sticky top-4">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Search Products
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryToggle(category.name)}
                          className="rounded border-green-300 text-green-600 focus:ring-green-500"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: Number(e.target.value) || 0,
                        }))
                      }
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Number(e.target.value) || 1000,
                        }))
                      }
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <Separator />

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="border-green-300 text-green-700"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryToggle(category)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-green-200 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-green-600 text-white"
                        : "text-green-700"
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-green-600 text-white"
                        : "text-green-700"
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <Card className="border-green-100">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {currentProducts.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show first page, last page, current page, and pages around current
                          return (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                          );
                        })
                        .map((page, index, array) => {
                          // Add ellipsis if there's a gap
                          const showEllipsis =
                            index > 0 && page - array[index - 1] > 1;

                          return (
                            <div key={page} className="flex items-center">
                              {showEllipsis && (
                                <span className="px-2 text-gray-500">...</span>
                              )}
                              <Button
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className={
                                  currentPage === page
                                    ? "bg-green-600 text-white"
                                    : "border-green-300 text-green-700 hover:bg-green-50"
                                }
                              >
                                {page}
                              </Button>
                            </div>
                          );
                        })}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* Results Info */}
                <div className="text-center text-sm text-gray-600 mt-4">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="">
      <Suspense fallback={<ProductsPageFallback />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}