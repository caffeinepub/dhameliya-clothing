import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../hooks/useQueries";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cart } = useCart();
  const cartCount =
    cart?.reduce((acc, item) => acc + Number(item.quantity), 0) ?? 0;

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/shop", label: "SHOP" },
    { to: "/about", label: "ABOUT" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 group"
          data-ocid="nav.link"
        >
          <Zap className="w-5 h-5 text-primary fill-primary" />
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
            STREET<span className="text-primary">DROP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-body text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 hover:text-primary transition-colors"
            data-ocid="nav.cart.link"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0"
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
