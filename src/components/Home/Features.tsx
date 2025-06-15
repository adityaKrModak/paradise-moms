"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "../common/ProductCard";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  GetProductsQuery,
  GetCategoriesQuery,
} from "@/graphql/generated/graphql";

type Product = GetProductsQuery["products"][0];
type Category = GetCategoriesQuery["categories"][0];

function Features() {
  const [selectedItem, setselectedItem] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    if (selectedItem === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product?.categories?.some(
            (category) => category?.name === selectedItem
          )
        )
      );
    }
  }, [selectedItem, products]);

  const handleselectedItem = (selectedItem: string) => {
    setselectedItem(selectedItem);
  };

  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (productsError || categoriesError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex-col bg-[#F2F2F2] md:pt-5 w-[100%] pt-8 ">
      <h2 className="font-semibold text-center md:text-2xl text-lg">
        Introducing Our Products
      </h2>

      <div className="flex justify-center items-center gap-3 w-25 text-[#808080]">
        <div className="mt-6 flex gap-3 items-center">
          <div
            onClick={() => handleselectedItem("All")}
            className={
              selectedItem === "All"
                ? "text-[#00B207] md:text-base text-sm"
                : "cursor-pointer md:text-base text-sm"
            }
          >
            All
          </div>
        </div>

        {categories.map(
          (item, index) =>
            item && (
              <div key={index} className="mt-6 flex gap-3 items-center">
                <div className="w-[1.5px]  h-[16px] bg-slate-300"></div>
                <div
                  onClick={() => handleselectedItem(item.name)}
                  className={
                    selectedItem === item.name
                      ? "text-[#00B207] md:text-base text-sm"
                      : "cursor-pointer text-sm"
                  }
                >
                  {item.name}
                </div>
              </div>
            )
        )}
      </div>

      <div className="mt-12  md:mt-8 md:m-auto ms-2 me-2 justify-center  flex flex-wrap md:gap-8 pb-12">
        {filteredProducts.map(
          (product) =>
            product && <ProductCard key={product.id} product={product} />
        )}
      </div>
    </div>
  );
}

export default Features;
