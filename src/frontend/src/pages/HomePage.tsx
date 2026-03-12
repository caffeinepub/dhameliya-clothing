import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { useFeaturedProducts, useNewArrivals } from "../hooks/useQueries";

export default function HomePage() {
  const { data: featured, isLoading: loadingFeatured } = useFeaturedProducts();
  const { data: newArrivals, isLoading: loadingNew } = useNewArrivals();

  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4"
            >
              ⚡ New Season Drop
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-6xl sm:text-8xl font-extrabold leading-none tracking-tight text-foreground mb-4"
            >
              WEAR
              <br />
              YOUR
              <br />
              <span className="text-primary">STORY.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-base text-muted-foreground mb-8 max-w-md leading-relaxed"
            >
              Premium streetwear crafted for those who move to their own beat.
              No rules. Just raw expression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <Button
                  size="lg"
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/80 font-bold tracking-widest text-sm px-8 h-12 shadow-glow"
                  data-ocid="hero.primary_button"
                >
                  SHOP NOW <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none border-foreground/30 text-foreground hover:bg-foreground/10 font-bold tracking-widest text-sm px-8 h-12"
                  data-ocid="hero.secondary_button"
                >
                  OUR STORY
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "10K+", label: "PIECES DROPPED" },
            { value: "100%", label: "STREET AUTHENTIC" },
            { value: "GEN Z", label: "DESIGNED FOR" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="font-body text-xs tracking-widest text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        data-ocid="featured.section"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-body text-xs font-bold tracking-[0.25em] text-primary uppercase mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-primary" /> Featured Drops
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              THE HEAT
            </h2>
          </div>
          <Link to="/shop" data-ocid="featured.link">
            <Button
              variant="ghost"
              size="sm"
              className="font-bold tracking-widest text-xs text-primary hover:text-primary/80"
            >
              VIEW ALL <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {loadingFeatured ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="featured.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : !featured?.length ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="featured.empty_state"
          >
            <p className="font-display text-lg">No featured drops yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section className="bg-card border-y border-border">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
          data-ocid="new_arrivals.section"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.25em] text-primary uppercase mb-2 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Just Landed
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                NEW ARRIVALS
              </h2>
            </div>
            <Link to="/shop" data-ocid="new_arrivals.link">
              <Button
                variant="ghost"
                size="sm"
                className="font-bold tracking-widest text-xs text-primary hover:text-primary/80"
              >
                SHOP ALL <ArrowRight className="ml-1 w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {loadingNew ? (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="new_arrivals.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : !newArrivals?.length ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="new_arrivals.empty_state"
            >
              <p className="font-display text-lg">No new arrivals yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-primary p-12 text-center"
        >
          <div className="relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-primary-foreground tracking-tight mb-4">
              DROP DIFFERENT.
            </h2>
            <p className="font-body text-primary-foreground/80 text-base mb-8 max-w-md mx-auto">
              Exclusive pieces. Limited quantities. Own your lane.
            </p>
            <Link to="/shop">
              <Button
                size="lg"
                className="rounded-none bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold tracking-widest text-sm px-10 h-12"
                data-ocid="cta.primary_button"
              >
                EXPLORE THE DROP
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
