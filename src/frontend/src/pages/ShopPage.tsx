import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Category } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useAllProducts, useProductsByCategory } from "../hooks/useQueries";

type FilterTab = "all" | Category;

const tabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: Category.hoodie, label: "HOODIES" },
  { value: Category.tee, label: "TEES" },
  { value: Category.jogger, label: "JOGGERS" },
  { value: Category.accessory, label: "ACCESSORIES" },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const allProducts = useAllProducts();
  const filtered = useProductsByCategory(activeTab);

  const { data: products, isLoading } =
    activeTab === "all" ? allProducts : filtered;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-body text-xs font-bold tracking-[0.3em] text-primary uppercase mb-2">
          Explore
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
          THE FULL DROP
        </h1>
      </div>

      {/* Filter Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as FilterTab)}
        className="mb-8"
      >
        <TabsList className="bg-card border border-border rounded-none h-auto p-0 gap-0 flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none px-4 sm:px-6 py-3 text-xs font-bold tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-r border-border last:border-r-0"
              data-ocid={`shop.${tab.value}.tab`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Product Grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="shop.loading_state"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/5] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : !products?.length ? (
        <div className="text-center py-24" data-ocid="shop.empty_state">
          <p className="font-display text-2xl font-bold text-muted-foreground">
            No pieces in this drop yet.
          </p>
          <p className="text-muted-foreground mt-2">
            Check back for new releases.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
