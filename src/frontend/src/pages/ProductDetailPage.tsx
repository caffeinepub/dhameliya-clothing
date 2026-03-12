import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddToCart, useAllProducts } from "../hooks/useQueries";
import {
  formatPrice,
  getCategoryLabel,
  getProductImage,
} from "../lib/productUtils";

const productDetails = [
  { label: "Material", value: "Premium Cotton Blend" },
  { label: "Fit", value: "Oversized" },
  { label: "Origin", value: "Street Crafted" },
  { label: "Season", value: "All Season" },
];

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: products, isLoading } = useAllProducts();
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const product = products?.find((p) => p.id.toString() === id);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(quantity),
      });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
        data-ocid="product_detail.loading_state"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="product_detail.error_state"
      >
        <h2 className="font-display text-3xl font-extrabold mb-4">
          Product not found
        </h2>
        <Link to="/shop">
          <Button className="rounded-none" data-ocid="product_detail.link">
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors"
        data-ocid="product_detail.link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative overflow-hidden aspect-[4/5] bg-muted">
            <img
              src={getProductImage(product.category)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground rounded-none px-3 py-1 text-xs font-bold tracking-widest">
                  NEW DROP
                </Badge>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <Badge
            variant="secondary"
            className="rounded-none w-fit text-xs tracking-widest uppercase mb-4"
          >
            {getCategoryLabel(product.category)}
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="font-display text-3xl font-extrabold text-primary mb-6">
            {formatPrice(product.priceCents)}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <p className="font-body text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Quantity
            </p>
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-muted transition-colors"
                data-ocid="product_detail.secondary_button"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-2 font-display font-bold text-sm border-x border-border">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-muted transition-colors"
                data-ocid="product_detail.primary_button"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            size="lg"
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/80 font-bold tracking-widest text-sm h-14 shadow-glow"
            data-ocid="product_detail.submit_button"
          >
            {addToCart.isPending ? (
              "ADDING..."
            ) : (
              <>
                <ShoppingCart className="mr-2 w-5 h-5" /> ADD TO CART
              </>
            )}
          </Button>

          <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
            {productDetails.map((detail) => (
              <div key={detail.label}>
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  {detail.label}
                </p>
                <p className="text-sm text-foreground mt-0.5">{detail.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
