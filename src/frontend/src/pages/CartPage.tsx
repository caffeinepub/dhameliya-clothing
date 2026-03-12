import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  useAllProducts,
  useCart,
  useClearCart,
  useRemoveFromCart,
} from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../lib/productUtils";

export default function CartPage() {
  const { data: cartItems, isLoading: cartLoading } = useCart();
  const { data: allProducts, isLoading: productsLoading } = useAllProducts();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const isLoading = cartLoading || productsLoading;

  const cartWithProducts = cartItems
    ?.map((item) => {
      const product = allProducts?.find((p) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => !!item.product);

  const subtotal =
    cartWithProducts?.reduce((acc, item) => {
      return acc + Number(item.product!.priceCents) * Number(item.quantity);
    }, 0) ?? 0;

  const handleRemove = async (productId: bigint, name: string) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success(`${name} removed from cart`);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  if (isLoading) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
        data-ocid="cart.loading_state"
      >
        <h1 className="font-display text-4xl font-extrabold mb-8">YOUR CART</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!cartWithProducts?.length) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" />
        <h1 className="font-display text-4xl font-extrabold mb-4">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-muted-foreground mb-8">
          No pieces selected yet. Time to drop something fire.
        </p>
        <Link to="/shop">
          <Button
            className="rounded-none bg-primary text-primary-foreground font-bold tracking-widest h-12 px-8"
            data-ocid="cart.link"
          >
            SHOP THE DROP <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">
          YOUR CART
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearCart}
          disabled={clearCart.isPending}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs font-bold tracking-widest rounded-none"
          data-ocid="cart.delete_button"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          CLEAR ALL
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartWithProducts.map((item, index) => (
              <motion.div
                key={item.productId.toString()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 bg-card border border-border p-4"
                data-ocid={`cart.item.${index + 1}`}
              >
                <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-muted">
                  <img
                    src={getProductImage(item.product!.category)}
                    alt={item.product!.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold tracking-tight">
                    {item.product!.name}
                  </h3>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                    Qty: {item.quantity.toString()}
                  </p>
                  <p className="font-display text-lg font-extrabold text-primary mt-2">
                    {formatPrice(
                      BigInt(
                        Number(item.product!.priceCents) *
                          Number(item.quantity),
                      ),
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleRemove(item.productId, item.product!.name)
                  }
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                  data-ocid={`cart.delete_button.${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-6 sticky top-24">
            <h2 className="font-display text-lg font-extrabold tracking-tight mb-4">
              ORDER SUMMARY
            </h2>
            <Separator className="mb-4" />

            <div className="space-y-2 mb-4">
              {cartWithProducts.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate mr-2">
                    {item.product!.name} ×{item.quantity.toString()}
                  </span>
                  <span className="font-bold flex-shrink-0">
                    {formatPrice(
                      BigInt(
                        Number(item.product!.priceCents) *
                          Number(item.quantity),
                      ),
                    )}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-display font-bold tracking-widest">
                TOTAL
              </span>
              <span className="font-display text-2xl font-extrabold text-primary">
                {formatPrice(BigInt(subtotal))}
              </span>
            </div>

            <Button
              size="lg"
              onClick={() => toast.info("Checkout coming soon! 🔥")}
              className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/80 font-bold tracking-widest h-12 shadow-glow"
              data-ocid="cart.submit_button"
            >
              CHECKOUT <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <Link to="/shop" className="block mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full rounded-none text-xs font-bold tracking-widest text-muted-foreground hover:text-primary"
                data-ocid="cart.secondary_button"
              >
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
