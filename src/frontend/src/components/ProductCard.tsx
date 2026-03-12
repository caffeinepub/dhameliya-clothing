import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAddToCart } from "../hooks/useQueries";
import {
  formatPrice,
  getCategoryLabel,
  getProductImage,
} from "../lib/productUtils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addToCart = useAddToCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      data-ocid={`product.item.${index + 1}`}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id.toString() }}
        className="group block"
      >
        <div className="bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/5] bg-muted">
            <img
              src={getProductImage(product.category)}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground text-xs font-bold tracking-widest rounded-none px-2">
                  NEW
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="text-xs tracking-widest rounded-none px-2 uppercase"
              >
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-display text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-3">
              <span className="font-body text-lg font-bold text-primary">
                {formatPrice(product.priceCents)}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/80 px-3 h-8 text-xs font-bold tracking-widest"
                data-ocid={`product.cart.button.${index + 1}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                ADD
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
