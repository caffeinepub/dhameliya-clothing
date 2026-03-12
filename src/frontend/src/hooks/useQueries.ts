import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNewArrivals() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", "new"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNewArrivals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category | "all") {
  const { actor, isFetching } = useActor();
  const all = useAllProducts();
  const byCategory = useQuery({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor || category === "all") return [];
      return actor.getProductsByCategory(category as Category);
    },
    enabled: !!actor && !isFetching && category !== "all",
  });
  if (category === "all") return all;
  return byCategory;
}

export function useCart() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.addItemToCart(productId, quantity);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeItemFromCart(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.clearCart();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}
