import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

const MARQUEE_TEXT =
  "STREETDROP · WEAR YOUR STORY · DROP SEASON · AUTH FITS · ";
const marqueeItems = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Marquee */}
      <div className="overflow-hidden py-3 border-b border-border bg-primary">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((key) => (
            <span
              key={key}
              className="font-display text-sm font-extrabold tracking-widest text-primary-foreground px-8"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span className="font-display text-lg font-extrabold">
                STREET<span className="text-primary">DROP</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Not just clothes. A statement. Built for the generation that
              refuses to blend in.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-muted-foreground mb-3">
              NAVIGATE
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/cart"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-muted-foreground mb-3">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground">Hoodies</span>
              <span className="text-sm text-foreground">Tees</span>
              <span className="text-sm text-foreground">Joggers</span>
              <span className="text-sm text-foreground">Accessories</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} StreetDrop. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
