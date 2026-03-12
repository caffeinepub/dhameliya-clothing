import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Globe, Target, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Zap,
    title: "AUTHENTIC AF",
    desc: "No filters, no fake hype. Every piece is built around street culture that's actually lived in, not manufactured in a boardroom.",
  },
  {
    icon: Target,
    title: "BUILT DIFFERENT",
    desc: "We don't follow trends. We drop pieces that are ahead of what's next. If it's mainstream, we already moved on.",
  },
  {
    icon: Users,
    title: "FOR THE CULTURE",
    desc: "StreetDrop is by the community, for the community. Every design is inspired by real people, real streets, real stories.",
  },
  {
    icon: Globe,
    title: "GLOBAL STREET",
    desc: "Street culture has no borders. Our drops pull from Tokyo alleys, NYC grids, Lagos markets, and London underpasses.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6">
              NOT YOUR
              <br />
              <span className="text-primary">AVERAGE</span>
              <br />
              BRAND.
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-xl leading-relaxed">
              StreetDrop was born from a simple frustration: too many brands
              talking about culture without actually living it.
            </p>
          </motion.div>
        </div>

        {/* Decorative */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5 hidden lg:block" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rotate-12 hidden lg:block" />
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              STARTED FROM THE STREET,
              <br />
              <span className="text-primary">BUILT FOR THE NOW.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                StreetDrop launched in 2022 with one mission: make real
                streetwear accessible without compromising on what makes street
                culture special — authenticity, edge, and expression without
                apology.
              </p>
              <p>
                Every piece is designed with Gen Z in mind — not the Gen Z
                brands think they understand, but the actual culture: the
                skating clips, the late-night studio sessions, the fits worn to
                protests and parties alike.
              </p>
              <p>
                We work with underground artists, graphic designers, and
                community members from around the world. No corporate
                interference. Just real art on real clothes.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-card border border-border p-8 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-primary" />
              <blockquote className="font-display text-2xl font-extrabold leading-tight">
                "Clothes are just the canvas.{" "}
                <span className="text-primary">Your story</span> is the art."
              </blockquote>
              <p className="text-muted-foreground text-sm mt-4 font-body">
                — StreetDrop Founding Manifesto
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="font-body text-xs font-bold tracking-[0.3em] text-primary uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              THE CODE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border p-6 hover:border-primary/50 transition-colors"
                data-ocid={`about.item.${i + 1}`}
              >
                <val.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-display text-base font-extrabold tracking-tight mb-3">
                  {val.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            READY TO DROP?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Explore the latest collection. Pieces that speak before you say a
            word.
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/80 font-bold tracking-widest text-sm px-10 h-12 shadow-glow"
              data-ocid="about.primary_button"
            >
              SHOP THE DROP
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
