import React, { useEffect, useRef, useState } from "react";
import {
  Building2, Users2, Boxes, Code2, Brain, Smartphone, Globe, Plug,
  ShieldCheck, Zap, Layers, GitBranch, Lock, Headphones, ArrowRight,
  ArrowUpRight, Menu, X, ChevronDown, Star, Check, ArrowUp, Server,
  TrendingUp, Activity, Search, PenTool, Hammer, Rocket, LifeBuoy,
  ClipboardCheck, Mail, Phone, MapPin, Link2, MessageCircle, Contact,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Design tokens (per brief)                                             */
/* ---------------------------------------------------------------------- */
const T = {
  primary: "#6D28D9",
  accent: "#8B5CF6",
  bg: "#09090B",
  card: "#111827",
  border: "rgba(255,255,255,0.08)",
  muted: "#9BA1AE",
};

/* ---------------------------------------------------------------------- */
/*  Scroll-reveal hook                                                    */
/* ---------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Animated counter for hero live-ops panel                              */
/* ---------------------------------------------------------------------- */
function useCounter(target, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ---------------------------------------------------------------------- */
/*  Data                                                                  */
/* ---------------------------------------------------------------------- */
const SERVICES = [
  { icon: Building2, title: "Enterprise ERP Development", desc: "Unified systems that connect finance, inventory, HR and operations into one source of truth." },
  { icon: Users2, title: "CRM Development", desc: "Pipelines, automation and reporting built around how your sales team actually sells." },
  { icon: Boxes, title: "SaaS Product Development", desc: "Multi-tenant platforms engineered to onboard your first customer and your ten-thousandth." },
  { icon: Code2, title: "Custom Software", desc: "Purpose-built tools for workflows that off-the-shelf software was never designed for." },
  { icon: Brain, title: "AI Powered Solutions", desc: "Applied AI for forecasting, support automation and decision support inside your product." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Native-feel iOS and Android apps sharing a single backend with your web platform." },
  { icon: Globe, title: "Web Applications", desc: "Fast, accessible web apps built on modern frameworks and tuned for real usage." },
  { icon: Plug, title: "API Integrations", desc: "Clean, documented APIs that connect your product to the tools your customers rely on." },
];

const FEATURES = [
  { icon: Layers, title: "Enterprise Architecture", desc: "Systems designed to hold their shape as your team and data grow." },
  { icon: GitBranch, title: "Scalable Code", desc: "Modular, testable codebases handed to you clean — never a black box." },
  { icon: Zap, title: "Fast Delivery", desc: "Working software in weeks, with visible progress every sprint." },
  { icon: Code2, title: "Modern Tech Stack", desc: "Current, well-supported tools chosen for your problem, not our habits." },
  { icon: ClipboardCheck, title: "Agile Development", desc: "Two-week sprints, transparent boards, no surprises at delivery." },
  { icon: Users2, title: "Dedicated Team", desc: "The same engineers from kickoff to launch — no rotating contractors." },
  { icon: Lock, title: "Security First", desc: "Auth, encryption and access control designed in from day one." },
  { icon: LifeBuoy, title: "Long Term Support", desc: "SLAs and a support desk that stay with your product after launch." },
];

const PROCESS = [
  { icon: Search, title: "Discovery", desc: "We map your workflows, users and constraints before writing a line of code." },
  { icon: PenTool, title: "Planning", desc: "Scope, architecture and milestones locked into a shared roadmap." },
  { icon: Layers, title: "Design", desc: "Wireframes and UI systems reviewed with you before development starts." },
  { icon: Hammer, title: "Development", desc: "Sprint-based builds with staging environments you can test anytime." },
  { icon: ShieldCheck, title: "Testing", desc: "QA, load testing and security review before anything ships." },
  { icon: Rocket, title: "Deployment", desc: "Zero-downtime releases to production, monitored end to end." },
  { icon: LifeBuoy, title: "Support", desc: "Ongoing monitoring, fixes and enhancements after go-live." },
];

const PROJECTS = [
  { title: "Hospital ERP", tag: "Healthcare", stack: "React · Node.js · PostgreSQL", desc: "Patient records, billing and bed management unified for a 300-bed hospital network.", color1: "#6D28D9", color2: "#312E81" },
  { title: "School Management System", tag: "Education", stack: "Next.js · Spring Boot · MySQL", desc: "Admissions, attendance and fee tracking for a 12-campus school group.", color1: "#7C3AED", color2: "#1E3A8A" },
  { title: "Retail POS", tag: "Retail", stack: "React Native · Node.js · Redis", desc: "Offline-first point of sale syncing inventory across 40+ store locations.", color1: "#8B5CF6", color2: "#4C1D95" },
  { title: "HR Management System", tag: "Human Resources", stack: "React · Laravel · MongoDB", desc: "Payroll, leave and performance reviews for a 2,000-employee workforce.", color1: "#6D28D9", color2: "#1E1B4B" },
  { title: "CRM Platform", tag: "Sales", stack: "React · Python · PostgreSQL", desc: "Pipeline automation and forecasting built for a B2B sales team of 60.", color1: "#7C3AED", color2: "#312E81" },
  { title: "Inventory SaaS", tag: "Logistics", stack: "Next.js · Node.js · Docker", desc: "Multi-warehouse stock tracking with live low-stock alerts, sold as SaaS.", color1: "#8B5CF6", color2: "#3730A3" },
];

const TECH = ["React", "Next.js", "Node.js", "Java", "Spring Boot", "Python", "Laravel", "Flutter", "Docker", "AWS", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Kubernetes"];

const TESTIMONIALS = [
  { name: "Rahul Kumar", role: "COO, PaperGenAi", quote: "OONOO understood exactly what an AI product needs — clean architecture, fast iteration, and a UI that doesn't get in the way. They shipped without cutting corners.", rating: 5 },
  { name: "Ishika Gupta", role: "Owner, Gyatri Chemical", quote: "We had no digital system before this — just registers and spreadsheets. OONOO gave us a proper inventory and billing setup that our whole team actually uses.", rating: 5 },
  { name: "Ravinder", role: "Head of Publishing, Warehouse", quote: "They built our publishing workflow around how our editorial team actually works, not a generic template. Turnaround on content now takes a fraction of the time.", rating: 5 },
];

const PRICING = [
  { name: "Starter", desc: "For a single focused product or MVP.", features: ["1 dedicated squad", "Web or mobile app", "Bi-weekly sprint demos", "3 months support included"] },
  { name: "Business", desc: "For growing platforms with multiple modules.", features: ["Dedicated engineering pod", "Web + mobile app", "Weekly sprint demos", "12 months support included", "Priority response SLA"], featured: true },
  { name: "Enterprise", desc: "For large-scale ERP and multi-team rollouts.", features: ["Multiple dedicated squads", "Custom architecture review", "Daily standups with your team", "24/7 support desk", "On-site onboarding available"] },
];

const FAQ = [
  { q: "How long does a typical project take?", a: "A focused MVP usually takes 8–12 weeks. Larger ERP or multi-module platforms run 4–9 months, scoped in phases so you see working software early." },
  { q: "Do you work with an existing codebase?", a: "Yes. We regularly audit and extend systems we didn't build, including legacy ERPs, before proposing a rebuild." },
  { q: "Who owns the code after launch?", a: "You do, fully. Source code, documentation and deployment access are handed over as part of every engagement." },
  { q: "Can you support us after the product ships?", a: "Every plan includes a support window, and we offer ongoing SLAs for monitoring, fixes and new features after that." },
  { q: "Where is your team based?", a: "OONOO Technologies is headquartered in India with engineers working in your time zone overlap for daily collaboration." },
];

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                 */
/* ---------------------------------------------------------------------- */
function GradientButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`oo-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`oo-btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }) {
  return <div className="oo-eyebrow">{children}</div>;
}

/* ---------------------------------------------------------------------- */
/*  Main component                                                        */
/* ---------------------------------------------------------------------- */
export default function OonooLanding() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [heroInView, setHeroInView] = useState(false);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // custom cursor (desktop only)
  useEffect(() => {
    const isFine = window.matchMedia("(pointer:fine)").matches;
    if (!isFine) return;
    const dot = cursorRef.current;
    if (!dot) return;
    const move = (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.style.opacity = "1";
    };
    const leave = () => (dot.style.opacity = "0");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  const revenue = useCounter(482300, 1800, heroInView);
  const orders = useCounter(1284, 1500, heroInView);
  const uptime = useCounter(999, 1400, heroInView);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="oo-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .oo-root {
          --primary: ${T.primary};
          --accent: ${T.accent};
          --bg: ${T.bg};
          --card: ${T.card};
          --border: ${T.border};
          --muted: ${T.muted};
          background: var(--bg);
          color: #fff;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
        }
        .oo-root * { box-sizing: border-box; }
        .oo-display { font-family: 'Space Grotesk', 'Inter', sans-serif; letter-spacing: -0.02em; }

        .oo-cursor {
          position: fixed; width: 18px; height: 18px; border-radius: 999px;
          border: 1.5px solid var(--accent); pointer-events: none; z-index: 100;
          transform: translate(-50%,-50%); opacity: 0; transition: opacity .2s ease, transform .12s ease;
          mix-blend-mode: difference;
        }
        @media (pointer:coarse) { .oo-cursor { display:none; } }

        .oo-loader {
          position: fixed; inset: 0; z-index: 200; background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .5s ease, visibility .5s ease;
        }
        .oo-loader.hide { opacity: 0; visibility: hidden; }
        .oo-loader-mark {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, var(--primary), #4338CA);
          animation: oo-pulse 1s ease-in-out infinite;
        }
        @keyframes oo-pulse { 0%,100%{ transform: scale(1); opacity:1;} 50%{ transform: scale(.82); opacity:.6;} }

        .oo-bg-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, black 40%, transparent 100%);
        }

        .oo-navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          transition: background .35s ease, border-color .35s ease, backdrop-filter .35s ease;
          border-bottom: 1px solid transparent;
        }
        .oo-navbar.solid {
          background: rgba(9,9,11,0.78);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }

        .oo-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 14px;
        }
        .oo-eyebrow::before {
          content: ''; width: 6px; height: 6px; border-radius: 999px;
          background: var(--accent); box-shadow: 0 0 0 3px rgba(139,92,246,0.18);
        }

        .oo-btn-primary {
          background: linear-gradient(135deg, var(--primary), #4338CA);
          color: #fff; border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 24px -8px rgba(109,40,217,0.65);
          transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s ease, filter .25s ease;
        }
        .oo-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 14px 32px -10px rgba(109,40,217,0.8); }
        .oo-btn-primary:active { transform: translateY(0); }

        .oo-btn-ghost {
          background: rgba(255,255,255,0.03); color: #fff;
          border: 1px solid var(--border);
          transition: background .25s ease, border-color .25s ease, transform .25s ease;
        }
        .oo-btn-ghost:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.18); transform: translateY(-2px); }

        .oo-card {
          background: linear-gradient(180deg, var(--card), rgba(17,24,39,0.6));
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease;
        }
        .oo-card:hover {
          transform: translateY(-6px);
          border-color: rgba(139,92,246,0.45);
          box-shadow: 0 24px 48px -24px rgba(109,40,217,0.55);
        }

        .oo-glass {
          background: rgba(17,24,39,0.55);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .oo-gradient-border {
          position: relative; border-radius: 20px; padding: 1px;
          background: linear-gradient(135deg, rgba(139,92,246,0.55), rgba(109,40,217,0.05));
        }
        .oo-gradient-border > div { border-radius: 19px; background: var(--card); }

        .oo-float { animation: oo-float 5.5s ease-in-out infinite; }
        .oo-float-slow { animation: oo-float 7.5s ease-in-out infinite; }
        @keyframes oo-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }

        .oo-glow {
          position: absolute; border-radius: 999px; filter: blur(90px); opacity: 0.35; pointer-events: none;
        }

        .oo-marquee-track { display: flex; width: max-content; animation: oo-marquee 26s linear infinite; }
        @keyframes oo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .oo-timeline-line {
          background: linear-gradient(180deg, var(--primary), transparent);
        }

        .oo-accordion-item { border-bottom: 1px solid var(--border); }
        .oo-chevron { transition: transform .3s ease; }
        .oo-chevron.open { transform: rotate(180deg); }
        .oo-accordion-body { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
        .oo-accordion-body.open { max-height: 240px; }

        .oo-pricing-featured {
          border-color: rgba(139,92,246,0.6) !important;
          box-shadow: 0 0 0 1px rgba(139,92,246,0.35), 0 30px 60px -30px rgba(109,40,217,0.7);
        }

        html { scroll-behavior: smooth; }
        ::selection { background: rgba(139,92,246,0.35); }
        a { color: inherit; }
      `}</style>

      <div ref={cursorRef} className="oo-cursor hidden md:block" />

      {/* Loader */}
      <div className={`oo-loader ${loading ? "" : "hide"}`}>
        <div className="oo-loader-mark" />
      </div>

      {/* Navbar */}
      <header className={`oo-navbar ${scrolled ? "solid" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src="/icons/oonoo-icon.svg" alt="OONOO Technologies" className="w-8 h-8 rounded-lg" />
            <span className="oo-display font-semibold text-lg">OONOO</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: T.muted }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="text-sm font-medium hover:text-white transition-colors" style={{ color: T.muted }}>oonoo.in</a>
            <GradientButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Start Your Project <ArrowRight size={15} />
            </GradientButton>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 oo-glass">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm py-1" style={{ color: T.muted }}>{l.label}</a>
            ))}
            <GradientButton onClick={() => { setMenuOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Start Your Project <ArrowRight size={15} />
            </GradientButton>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" ref={heroRef} className="relative pt-40 pb-28 px-6 lg:px-8 overflow-hidden">
        <div className="oo-bg-grid" />
        <div className="oo-glow oo-float-slow" style={{ width: 460, height: 460, background: T.primary, top: -120, left: -140 }} />
        <div className="oo-glow oo-float" style={{ width: 380, height: 380, background: T.accent, top: 60, right: -120 }} />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <Eyebrow>Software Development Company · oonoo.in</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="oo-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold">
                We Build ERP, CRM &amp; SaaS Products That Scale Your Business
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg max-w-xl" style={{ color: T.muted }}>
                OONOO Technologies designs and engineers enterprise software, custom platforms and
                AI-powered products for teams that have outgrown spreadsheets and off-the-shelf tools.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-4">
                <GradientButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Start Your Project <ArrowRight size={16} />
                </GradientButton>
                <GhostButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  View Portfolio
                </GhostButton>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-12 flex items-center gap-8 text-sm" style={{ color: T.muted }}>
                <div><span className="text-white font-semibold oo-display text-xl">60+</span><br />products shipped</div>
                <div className="w-px h-8" style={{ background: T.border }} />
                <div><span className="text-white font-semibold oo-display text-xl">99.9%</span><br />avg. uptime</div>
                <div className="w-px h-8" style={{ background: T.border }} />
                <div><span className="text-white font-semibold oo-display text-xl">8 yrs</span><br />building software</div>
              </div>
            </Reveal>
          </div>

          {/* Signature hero element: live ops panel cluster */}
          <div className="relative h-[420px] hidden sm:block">
            <div className="oo-gradient-border oo-float absolute top-2 right-4 w-64" style={{ animationDelay: "0.2s" }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: T.muted }}>Monthly Revenue</span>
                  <TrendingUp size={15} color={T.accent} />
                </div>
                <div className="oo-display text-2xl font-semibold">₹{revenue.toLocaleString("en-IN")}</div>
                <div className="mt-3 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: "72%", background: `linear-gradient(90deg, ${T.primary}, ${T.accent})` }} />
                </div>
              </div>
            </div>

            <div className="oo-gradient-border oo-float-slow absolute top-40 left-0 w-56" style={{ animationDelay: "0.6s" }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: T.muted }}>Active Orders</span>
                  <Activity size={15} color={T.accent} />
                </div>
                <div className="oo-display text-2xl font-semibold">{orders.toLocaleString("en-IN")}</div>
                <div className="mt-2 text-xs" style={{ color: "#4ADE80" }}>+18% this week</div>
              </div>
            </div>

            <div className="oo-gradient-border oo-float absolute bottom-2 right-10 w-52" style={{ animationDelay: "1s" }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: T.muted }}>System Uptime</span>
                  <Server size={15} color={T.accent} />
                </div>
                <div className="oo-display text-2xl font-semibold">{(uptime / 10).toFixed(1)}%</div>
                <div className="mt-2 text-xs" style={{ color: T.muted }}>Across 6 production clusters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="px-6 lg:px-8 py-14 border-t border-b" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-medium tracking-wide uppercase mb-8" style={{ color: T.muted }}>
            Trusted by growing teams across industries
          </p>
          <div className="overflow-hidden">
            <div className="oo-marquee-track gap-16 opacity-60">
              {[...Array(2)].flatMap((_, i) =>
                ["Meditrack", "Stockwise", "Verlino", "Northbridge", "Cirrus Retail", "Panvel HR", "Flotilla Logistics"].map((n, j) => (
                  <span key={`${i}-${j}`} className="oo-display text-xl font-semibold whitespace-nowrap" style={{ color: T.muted }}>{n}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 lg:px-8 py-28 max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>What we build</Eyebrow>
          <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">Software for every layer of your business</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="oo-card p-6 h-full">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(139,92,246,0.12)" }}>
                  <s.icon size={20} color={T.accent} />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="px-6 lg:px-8 py-28 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Eyebrow>Why OONOO</Eyebrow>
            <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">Built by engineers who plan to still be here in year three</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: T.border }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50} className="h-full">
                <div className="p-7 h-full" style={{ background: T.bg }}>
                  <f.icon size={20} color={T.accent} className="mb-4" />
                  <h3 className="font-semibold mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 lg:px-8 py-28 max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">Seven stages, one accountable team</h2>
        </Reveal>
        <div className="mt-16 relative pl-10">
          <div className="oo-timeline-line absolute left-[15px] top-1 bottom-1 w-px" />
          <div className="flex flex-col gap-10">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="relative flex gap-6 items-start">
                  <div className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: T.bg, border: `2px solid ${T.primary}` }}>
                    <p.icon size={14} color={T.accent} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm" style={{ color: T.muted }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 lg:px-8 py-28 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">Products shipped and running today</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="oo-card overflow-hidden h-full flex flex-col">
                  <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2})` }}>
                    <div className="absolute inset-0 oo-bg-grid opacity-40" />
                    <span className="absolute bottom-3 left-4 text-xs font-medium px-2.5 py-1 rounded-full oo-glass">{p.tag}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold mb-1.5 flex items-center gap-1.5">
                      {p.title} <ArrowUpRight size={15} color={T.muted} />
                    </h3>
                    <p className="text-sm mb-3" style={{ color: T.muted }}>{p.desc}</p>
                    <p className="text-xs mt-auto pt-3 font-medium" style={{ color: T.accent }}>{p.stack}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="px-6 lg:px-8 py-24 max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Under the hood</Eyebrow>
          <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">A modern, boring-on-purpose stack</h2>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {TECH.map((t, i) => (
            <Reveal key={t} delay={i * 30}>
              <span className="text-sm px-4 py-2 rounded-full oo-card inline-block" style={{ borderRadius: 999 }}>{t}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 lg:px-8 py-28 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Eyebrow>Client feedback</Eyebrow>
            <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">What running teams say after launch</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="oo-card p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill={T.accent} color={T.accent} />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#E5E7EB" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${T.primary}, ${T.accent})` }}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs" style={{ color: T.muted }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 lg:px-8 py-28 max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Engagement plans</Eyebrow>
          <h2 className="oo-display text-3xl sm:text-4xl font-semibold max-w-xl">Pricing shaped around your project, not a price list</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div className={`oo-card p-8 h-full flex flex-col ${p.featured ? "oo-pricing-featured" : ""}`}>
                {p.featured && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full self-start mb-4" style={{ background: "rgba(139,92,246,0.15)", color: T.accent }}>
                    Most popular
                  </span>
                )}
                <h3 className="oo-display text-xl font-semibold mb-1.5">{p.name}</h3>
                <p className="text-sm mb-6" style={{ color: T.muted }}>{p.desc}</p>
                <div className="oo-display text-2xl font-semibold mb-6">Contact Us</div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#E5E7EB" }}>
                      <Check size={15} color={T.accent} className="mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                {p.featured ? (
                  <GradientButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Talk to us</GradientButton>
                ) : (
                  <GhostButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Talk to us</GhostButton>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 lg:px-8 py-28 border-t max-w-3xl mx-auto" style={{ borderColor: T.border }}>
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="oo-display text-3xl sm:text-4xl font-semibold">Good to know before you reach out</h2>
        </Reveal>
        <div className="mt-12">
          {FAQ.map((f, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={f.q} delay={i * 40}>
                <div className="oo-accordion-item">
                  <button
                    className="w-full flex items-center justify-between py-5 text-left"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span className="font-medium pr-6">{f.q}</span>
                    <ChevronDown size={18} className={`oo-chevron shrink-0 ${open ? "open" : ""}`} color={T.muted} />
                  </button>
                  <div className={`oo-accordion-body ${open ? "open" : ""}`}>
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: T.muted }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 lg:px-8 py-28">
        <Reveal>
          <div className="max-w-5xl mx-auto rounded-3xl relative overflow-hidden p-12 sm:p-16 text-center" style={{ background: `linear-gradient(135deg, ${T.primary}, #312E81)` }}>
            <div className="oo-bg-grid opacity-30" />
            <h2 className="oo-display text-3xl sm:text-4xl font-semibold relative">Let&rsquo;s Build Something Amazing Together</h2>
            <p className="mt-4 relative max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              Tell us what you&rsquo;re building. We&rsquo;ll reply within one business day with next steps.
            </p>
            <div className="mt-9 relative">
              <GhostButton style={{ background: "rgba(9,9,11,0.85)" }} onClick={() => window.alert("Thanks — this would open your booking flow.")}>
                Book Free Consultation <ArrowRight size={16} />
              </GhostButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 lg:px-8 pt-16 pb-10 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/icons/oonoo-icon.svg" alt="OONOO Technologies" className="w-8 h-8 rounded-lg" />
              <span className="oo-display font-semibold text-lg">OONOO</span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: T.muted }}>Building powerful digital products for businesses. oonoo.in</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: T.muted }}>
              {navLinks.map((l) => <li key={l.href}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: T.muted }}>
              {SERVICES.slice(0, 5).map((s) => <li key={s.title}>{s.title}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: T.muted }}>
              <li className="flex items-center gap-2"><Mail size={14} /> akash@oonoo.in</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +91 91614926060</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Noida, India</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full flex items-center justify-center oo-card"><Link2 size={15} /></a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full flex items-center justify-center oo-card"><Contact size={15} /></a>
              <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-full flex items-center justify-center oo-card"><MessageCircle size={15} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-14 pt-6 border-t text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ borderColor: T.border, color: T.muted }}>
          <span>© {new Date().getFullYear()} OONOO Technologies. All rights reserved.</span>
          <span>Designed &amp; built for oonoo.in</span>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full flex items-center justify-center oo-btn-primary"
        style={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? "auto" : "none", transition: "opacity .3s ease" }}
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}