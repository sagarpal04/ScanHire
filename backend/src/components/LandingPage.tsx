import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Target,
  Zap,
  TrendingUp,
  Sparkles,
  Shield,
  BarChart3,
  Brain,
  FileSearch,
  ChevronDown,
} from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  { icon: <Target className="w-4 h-4" />, text: "ATS Score", desc: "Real-time compatibility scoring" },
  { icon: <Zap className="w-4 h-4" />, text: "AI Refinement", desc: "Smart content optimization" },
  { icon: <TrendingUp className="w-4 h-4" />, text: "Keyword Match", desc: "Industry-specific analysis" },
];

const stats = [
  { icon: <Shield className="w-5 h-5" />, value: "98%", label: "Accuracy" },
  { icon: <BarChart3 className="w-5 h-5" />, value: "10K+", label: "Resumes Analyzed" },
  { icon: <Sparkles className="w-5 h-5" />, value: "Free", label: "No Sign-up" },
];

const steps = [
  { num: "01", title: "Upload Resume", desc: "Drop your PDF and we extract & clean the text instantly", icon: <FileSearch className="w-6 h-6" /> },
  { num: "02", title: "Add Job Description", desc: "Paste or auto-scrape from any job posting URL", icon: <Brain className="w-6 h-6" /> },
  { num: "03", title: "Get ATS Score", desc: "Receive detailed analysis with actionable improvements", icon: <Target className="w-6 h-6" /> },
];

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${20 + i * 15}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.06, scaleX: 1 }}
          transition={{ delay: 1.5 + i * 0.15, duration: 1.5 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        </motion.div>
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${20 + i * 15}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.04, scaleY: 1 }}
          transition={{ delay: 1.8 + i * 0.15, duration: 1.5 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
}

function OrbitingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i === 0 ? "hsl(263 70% 60%)" : i === 1 ? "hsl(230 80% 60%)" : "hsl(290 70% 55%)",
            boxShadow: `0 0 12px ${i === 0 ? "hsl(263 70% 60% / 0.6)" : i === 1 ? "hsl(230 80% 60% / 0.6)" : "hsl(290 70% 55% / 0.6)"}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{
              background: "inherit",
              boxShadow: "inherit",
              transform: `translateX(${100 + i * 60}px)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const orbX = useTransform(smoothX, [0, 1], [-30, 30]);
  const orbY = useTransform(smoothY, [0, 1], [-30, 30]);
  // ✅ FIX: pre-compute inverted transforms at hook level
  const orbXInv = useTransform(smoothX, [0, 1], [30, -30]);
  const orbYInv = useTransform(smoothY, [0, 1], [30, -30]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-background noise-overlay">
      {/* Multi-layer background */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 mesh-bg" />

      {/* Animated orbs with parallax */}
      <motion.div
        className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-primary/15 blur-[150px] pointer-events-none"
        style={{ x: orbX, y: orbY }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      {/* ✅ FIX: use pre-computed orbXInv / orbYInv instead of inline useTransform */}
      <motion.div
        className="absolute bottom-[-25%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/12 blur-[130px] pointer-events-none"
        style={{ x: orbXInv, y: orbYInv }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <GridLines />
      <OrbitingParticles />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${8 + i * 7.5}%`,
            top: `${10 + (i % 5) * 18}%`,
            background: i % 2 === 0 ? "hsl(263 70% 60%)" : "hsl(230 80% 65%)",
          }}
          animate={{
            y: [0, -(20 + i * 5), 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-5xl"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="relative mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gradient-border text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/70">
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>AI-Powered ATS Analysis</span>
              <motion.div
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-foreground font-display"
            >
              Beat the
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] gradient-text font-display"
            >
              Algorithm.
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-sm md:text-base text-muted-foreground font-light max-w-md leading-relaxed mb-10"
          >
            Upload your resume. Paste a job description.
            <br className="hidden sm:block" />
            Get an instant <span className="text-foreground font-medium">AI-powered ATS score</span> with actionable improvements.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 200 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="group flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl gradient-border cursor-default"
              >
                <div className="p-1.5 rounded-lg bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors">
                  {f.icon}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">{f.text}</p>
                  <p className="text-[9px] text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="relative glow-purple group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <Sparkles className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Start Free Analysis</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-xs text-muted-foreground/40 flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-glow" />
            No sign-up required · 100% free · Instant results
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground/30">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-3">How it works</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground font-display">
              Three steps to your
              <br />
              <span className="gradient-text">perfect score</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative glass rounded-2xl p-6 glow-card gradient-border"
              >
                <div className="text-[60px] font-black text-primary/[0.05] absolute top-3 right-5 font-display leading-none select-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <motion.div
                    className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-base font-bold text-foreground mb-2 font-display">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/30 to-transparent z-20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 gradient-border glow-card"
          >
            <div className="grid grid-cols-3 divide-x divide-border/20">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 px-4"
                >
                  <div className="text-primary/50 mb-1">{stat.icon}</div>
                  <span className="text-2xl font-black text-foreground font-display">{stat.value}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4 font-display">
            Ready to land your
            <br />
            <span className="gradient-text">dream job?</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
            Join thousands of job seekers who improved their resume match rate with our AI analysis tool.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="glow-purple inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground"
          >
            <Sparkles className="w-4 h-4" />
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
              <img src="/log.png" alt="ScanHire AI Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-bold text-foreground/60 font-display">ScanHire AI</span>
          </div>
          <p className="text-xs text-muted-foreground/30">Built with AI · Free forever</p>
        </div>
      </footer>
    </div>
  );
}