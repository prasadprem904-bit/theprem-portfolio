import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Code2,
  Box,
  Sparkle,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Package,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";
import portrait from "@/assets/prem-portrait.png";
import logoCoreAI from "@/assets/logos/coreai.png";
import logoShot from "@/assets/logos/shot.png";
import logoNaamSutra from "@/assets/logos/naamsutra.png";
import logoSarkari from "@/assets/logos/sarkari.png";
import logoCalcPro from "@/assets/logos/calcpro.png";
import logoBusinessGrowth from "@/assets/logos/businessgrowth.png";
import logoSip from "@/assets/logos/sip.png";
import logoTryOnix from "@/assets/logos/tryonix.png";
import logoBuzz from "@/assets/logos/buzz.png";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Labs", href: "#labs" },
  { label: "Updates", href: "#updates" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type Product = {
  name: string;
  desc: string;
  logo: string;
  url: string;
  status: "Live";
};

const PRODUCTS: Product[] = [
  { name: "CoreAI", desc: "AI assistant for everyone.", logo: logoCoreAI, url: "https://coreaii.vercel.app/", status: "Live" },
  { name: "Shot", desc: "Perfect photography, made simple.", logo: logoShot, url: "https://your-perfect-shot-five.vercel.app/", status: "Live" },
  { name: "NaamSutra", desc: "Beautiful names for your little ones.", logo: logoNaamSutra, url: "https://naamsutra.vercel.app/", status: "Live" },
  { name: "Sarkari Sahayak", desc: "Your guide for all government services.", logo: logoSarkari, url: "https://sarkari-sahayak-guide.vercel.app/", status: "Live" },
  { name: "CalcPro", desc: "Smart calculator for every calculation.", logo: logoCalcPro, url: "https://calcproapp.vercel.app/", status: "Live" },
  { name: "BusinessGrowth", desc: "Tools to grow your business.", logo: logoBusinessGrowth, url: "https://bussinessgrowth.vercel.app/", status: "Live" },
  { name: "Sip", desc: "Stay hydrated, stay healthy.", logo: logoSip, url: "https://sipwaterreminder.vercel.app/", status: "Live" },
];

const STATS = [
  { value: "9+", label: "Products", Icon: Package },
  { value: "7", label: "Live Products", Icon: ShieldCheck },
  { value: "2", label: "In Development", Icon: FlaskConical },
  { value: "100%", label: "Independently Built", Icon: Heart },
];

export default function Home() {
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <BetaAndBuilding />
        <About />
        <Stats />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------- Navbar -------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 120 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3">
          <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border bg-muted shadow-[var(--shadow-soft)]">
            <img src={portrait} alt="Prem Prasad" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            The<span className="text-primary">Prem</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#products"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:bg-[oklch(0.55_0.12_165)]"
        >
          Explore Products
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}

/* -------------------------- Hero -------------------------- */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Building · Creating · Innovating
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Building products
            <br />
            that solve real
            <br />
            <span className="text-primary">problems.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Hi, I'm Prem Prasad. I build AI products, productivity tools and digital experiences that
            simplify everyday life.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:bg-[oklch(0.55_0.12_165)]"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20"
            >
              View Labs
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Made with <span className="text-[oklch(0.6_0.22_25)]">♥</span> by Prem Prasad
          </p>
        </motion.div>

        <HeroPortrait />
      </div>
    </section>
  );
}

function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 120, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div className="absolute inset-6 rounded-full bg-gradient-to-b from-muted to-background shadow-[var(--shadow-lift)] ring-1 ring-border" />
        <div className="absolute inset-10 overflow-hidden rounded-full bg-muted">
          <img src={portrait} alt="Prem Prasad portrait" className="h-full w-full object-cover" />
        </div>
        {/* Floating minimal icons */}
        <FloatingIcon className="left-2 top-16" Icon={BarChart3} delay={0} />
        <FloatingIcon className="right-4 top-20" Icon={Code2} delay={0.6} />
        <FloatingIcon className="left-6 bottom-20" Icon={Box} delay={1.2} />
        <FloatingIcon className="right-2 bottom-16" Icon={Sparkle} delay={1.8} />
      </motion.div>
    </motion.div>
  );
}

function FloatingIcon({
  className = "",
  Icon,
  delay,
}: {
  className?: string;
  Icon: typeof Sparkles;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-soft)] ${className}`}
    >
      <Icon className="h-5 w-5 text-muted-foreground" />
    </motion.div>
  );
}

/* -------------------------- Products -------------------------- */
function Products() {
  return (
    <Section id="products" className="border-t border-border">
      <SectionHeader
        eyebrow="Products"
        title="Everything I've built in one place."
        subtitle="Simple tools, powerful results."
        action={
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground/20"
          >
            View All <ArrowRight className="h-4 w-4" />
          </a>
        }
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex cursor-pointer flex-col rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-soft)]">
          <img
            src={p.logo}
            alt={`${p.name} logo`}
            width={512}
            height={512}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-semibold text-foreground">{p.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.96_0.05_155)] px-3 py-1 text-xs font-semibold text-[oklch(0.45_0.15_155)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.6_0.17_152)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.6_0.17_152)]" />
          </span>
          {p.status}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Open <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.a>
  );
}

/* -------------------------- Beta + Building -------------------------- */
function BetaAndBuilding() {
  return (
    <Section id="labs" className="border-t border-border">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BigCard
          eyebrow="Currently Building"
          title="TryOnix"
          desc="AI virtual try-on for a better shopping experience."
          badge={{ text: "In Development", tone: "danger" }}
          logo={logoTryOnix}
          url="https://aitryonix.vercel.app/"
          cta="Coming Soon"
          wip
        />
        <BigCard
          eyebrow="Currently Building"
          title="Buzz"
          desc="News, trends and updates in one place."
          badge={{ text: "In Development", tone: "danger" }}
          logo={logoBuzz}
          url="https://buzzofficial.vercel.app/"
          cta="Coming Soon"
          wip
        />
      </div>
    </Section>
  );
}

function BigCard({
  eyebrow,
  title,
  desc,
  badge,
  logo,
  url,
  cta,
  wip = false,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  badge: { text: string; tone: "warning" | "danger" };
  logo: string;
  url: string;
  cta: string;
  wip?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const badgeCls =
    badge.tone === "warning"
      ? "bg-[oklch(0.97_0.05_85)] text-[oklch(0.5_0.15_75)]"
      : "bg-[oklch(0.97_0.04_25)] text-[oklch(0.5_0.2_25)]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]"
    >
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </div>
        <div className="mt-4 flex items-start gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-soft)]">
            <img
              src={logo}
              alt={`${title} logo`}
              width={512}
              height={512}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-2xl font-semibold text-foreground">{title}</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeCls}`}>
                {badge.text}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        </div>

        {wip && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Work in Progress</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Actively building
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/3 rounded-full bg-primary/70"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
        </a>
        {wip && (
          <p className="mt-3 text-xs text-muted-foreground">
            Opens the preview site — Buzz is currently under active development.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------- About -------------------------- */
function About() {
  return (
    <Section id="about" className="border-t border-border">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto"
        >
          <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border border-border bg-muted shadow-[var(--shadow-lift)]">
            <img src={portrait} alt="Prem Prasad" className="h-full w-full object-cover" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Meet the Builder
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Prem Prasad
          </h2>
          <div className="mt-4 h-0.5 w-16 rounded-full bg-primary" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Hi, I'm Prem Prasad. I love building useful software. Every product on this website is
            designed, developed and maintained independently.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            My mission is to create simple products that solve real problems for millions of users —
            from AI tools to productivity apps.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5"
            >
              Read My Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* -------------------------- Stats -------------------------- */
function Stats() {
  return (
    <Section className="border-t border-border">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s, i) => (
          <StatCard key={s.label} s={s} i={i} />
        ))}
        <StatCard s={{ value: "1", label: "Under Development", Icon: Code2 }} i={4} />
      </div>
    </Section>
  );
}

function StatCard({
  s,
  i,
}: {
  s: { value: string; label: string; Icon: typeof Sparkles };
  i: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
        <s.Icon className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
      </div>
      <div>
        <div className="font-display text-3xl font-semibold tracking-tight text-foreground">
          {s.value}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
      </div>
    </motion.div>
  );
}

/* -------------------------- Newsletter -------------------------- */
function Newsletter() {
  return (
    <Section id="updates" className="border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-[oklch(0.985_0.02_165)] p-8 shadow-[var(--shadow-soft)] sm:p-12 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Stay updated.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get notified whenever I launch a new product.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-[var(--shadow-soft)]"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </Section>
  );
}

/* -------------------------- Footer -------------------------- */
function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                <img src={portrait} alt="Prem Prasad" className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                The<span className="text-primary">Prem</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building simple, useful and powerful products for everyone.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Products</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.name}>
                  <a href="#products" className="hover:text-foreground">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} ThePrem. All rights reserved.</div>
          <div>
            Made with <span className="text-[oklch(0.6_0.22_25)]">♥</span> by Prem Prasad
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------- Primitives -------------------------- */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}