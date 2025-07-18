import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { CartItem } from "@/redux/slices/cartSlice";
import { removeItem, updateItemDetails } from "@/redux/slices/cartSlice";
import { useGetProductLazyQuery } from "@/graphql/generated/graphql";

export const useCartValidation = (items: CartItem[]) => {
  const dispatch = useDispatch();
  const [getProduct] = useGetProductLazyQuery();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const validateCartItems = async () => {
      if (items.length === 0) {
        setIsValidating(false);
        return;
      }

      setIsValidating(true);

      const validationPromises = items.map((item) =>
        getProduct({ variables: { id: item.id } })
          .then((result) => {
            if (!result.data?.product) {
              return { id: item.id, status: "removed" as const };
            }
            if (result.data.product.price !== item.price) {
              return {
                id: item.id,
                status: "updated" as const,
                product: result.data.product,
              };
            }
            return { id: item.id, status: "ok" as const };
          })
          .catch(() => ({ id: item.id, status: "removed" as const }))
      );

      try {
        const results = await Promise.all(validationPromises);
        if (!isMounted) return;

        const itemsToRemove = results
          .filter((r) => r.status === "removed")
          .map((r) => r.id);
        const itemsToUpdate = results.filter((r) => r.status === "updated");

        if (itemsToRemove.length > 0) {
          toast.warning(
            "Some items in your cart are no longer available and have been removed."
          );
          itemsToRemove.forEach((id) => dispatch(removeItem(id)));
        }

        if (itemsToUpdate.length > 0) {
          toast.info(
            "The price of some items in your cart has changed and has been updated."
          );
          itemsToUpdate.forEach((item) => {
            if (item.product) {
              dispatch(
                updateItemDetails({
                  id: item.id,
                  name: item.product.name,
                  price: item.product.price,
                })
              );
            }
          });
        }
      } catch (error) {
        console.error("Cart validation failed:", error);
        toast.error("Could not validate cart items. Please try again later.");
      } finally {
        if (isMounted) {
          setIsValidating(false);
        }
      }
    };

    validateCartItems();

    return () => {
      isMounted = false;
    };
  }, [items, getProduct, dispatch]);

  return { isValidating };
};
