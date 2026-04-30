"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, ArrowRight, Sparkles, Code2, Palette, Globe } from "lucide-react";

// Animated Background Component
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#1A1AFF] to-[#00E5FF] rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
    </div>
  );
};

// Cursor Glow Effect
const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle, rgba(26, 26, 255, 0.08) 0%, transparent 70%)",
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
      }}
      animate={{
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
};

// Navigation
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-[#22222D]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#"
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-white">Cod</span>
            <span className="gradient-text">arti</span>
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            {["Work", "Services", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[#888899] hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#1A1AFF] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.a
            href="#contact"
            className="px-5 py-2.5 bg-gradient-to-r from-[#1A1AFF] to-[#00E5FF] text-white text-sm font-medium rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(26, 26, 255, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s Talk
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#22222D] bg-[#111118]/50 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-sm text-[#888899]">Premium Software Craftsmanship</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="block text-white">Build</span>
          <span className="block gradient-text glow-text">Boldly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[#888899] max-w-2xl mx-auto mb-12"
        >
          We architect digital experiences that define the future.
          <br className="hidden md:block" />
          No fluff. Just results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#work"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-[#0A0A0F] font-semibold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Our Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 border border-[#22222D] text-white font-semibold rounded-full hover:border-[#1A1AFF] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Project
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#22222D] rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-gradient-to-b from-[#1A1AFF] to-[#00E5FF] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      name: "iGaPrep",
      url: "igaprep.com",
      description: "Exam preparation platform",
      color: "#1A1AFF",
    },
    {
      name: "FirstInQueue",
      url: "firstinqueue.com",
      description: "Queue management system",
      color: "#00E5FF",
    },
    {
      name: "PredictionCube",
      url: "predictioncube.com",
      description: "Predictive analytics engine",
      color: "#7B61FF",
    },
  ];

  return (
    <section id="work" className="relative py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm text-[#1A1AFF] font-medium tracking-wider uppercase mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">Projects that speak.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.name}
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-3xl border border-[#22222D] bg-[#111118]/30 overflow-hidden"
              whileHover={{ y: -8, borderColor: project.color }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}20, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs text-[#888899] font-mono">0{index + 1}</span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-[#22222D] flex items-center justify-center group-hover:border-[project.color] group-hover:bg-[project.color] transition-all"
                    style={{ ["--project-color"]: project.color } as React.CSSProperties}
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#888899] group-hover:text-white transition-colors" />
                  </motion.div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:gradient-text transition-all">
                  {project.name}
                </h3>
                <p className="text-[#888899] text-sm">{project.description}</p>
                <p className="text-xs text-[#444455] mt-4 font-mono">{project.url}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const services = [
    { icon: Code2, name: "Engineering", desc: "Full-stack architecture" },
    { icon: Palette, name: "Design", desc: "Interface craftsmanship" },
    { icon: Globe, name: "Strategy", desc: "Digital transformation" },
  ];

  return (
    <section id="services" className="relative py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm text-[#00E5FF] font-medium tracking-wider uppercase mb-4 block">Services</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">What we do.</h2>
            <p className="text-[#888899] text-lg">
              We build. We design. We ship.
              <br />
              Premium digital products, delivered.
            </p>
          </motion.div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-2xl border border-[#22222D] bg-[#111118]/30 hover:border-[#1A1AFF]/50 transition-all cursor-default"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A1AFF] to-[#00E5FF] flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:gradient-text transition-all mb-1">{service.name}</h3>
                    <p className="text-[#888899] text-base">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="relative py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm text-[#1A1AFF] font-medium tracking-wider uppercase mb-4 block">Contact</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Let&apos;s build.</h2>
            <p className="text-[#888899] text-lg mb-12">
              Have a project in mind?
              <br />
              We&apos;d love to hear about it.
            </p>

            <div className="space-y-8">
              <motion.a
                href="mailto:support@codarti.com"
                className="flex items-center gap-5 group"
                whileHover={{ x: 8 }}
              >
                <div className="w-14 h-14 rounded-xl border border-[#22222D] flex items-center justify-center group-hover:border-[#1A1AFF] group-hover:bg-[#1A1AFF]/10 transition-all flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#888899] group-hover:text-[#1A1AFF]" />
                </div>
                <div>
                  <p className="text-xs text-[#888899] uppercase tracking-wider mb-1">Email</p>
                  <p className="text-lg text-white group-hover:gradient-text transition-all">support@codarti.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+260970627630"
                className="flex items-center gap-5 group"
                whileHover={{ x: 8 }}
              >
                <div className="w-14 h-14 rounded-xl border border-[#22222D] flex items-center justify-center group-hover:border-[#00E5FF] group-hover:bg-[#00E5FF]/10 transition-all flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#888899] group-hover:text-[#00E5FF]" />
                </div>
                <div>
                  <p className="text-xs text-[#888899] uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-lg text-white group-hover:text-[#00E5FF] transition-all">+260 970 627 630</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-5 group"
                whileHover={{ x: 8 }}
              >
                <div className="w-14 h-14 rounded-xl border border-[#22222D] flex items-center justify-center group-hover:border-[#7B61FF] group-hover:bg-[#7B61FF]/10 transition-all flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#888899] group-hover:text-[#7B61FF]" />
                </div>
                <div>
                  <p className="text-xs text-[#888899] uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg text-white">Plot 190/10, Chawama, Lusaka, Zambia</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 lg:p-12 rounded-3xl border border-[#22222D] bg-gradient-to-br from-[#111118] to-[#0A0A0F]"
          >
            <p className="text-2xl lg:text-3xl font-light text-[#888899] leading-relaxed">
              &ldquo;We don&apos;t just write code.
              <br />
              <span className="text-white font-medium">We architect solutions</span> that scale,
              <br />
              <span className="gradient-text font-semibold">perform,</span> and
              <span className="gradient-text font-semibold"> inspire.</span>&rdquo;
            </p>
            <div className="mt-8 pt-8 border-t border-[#22222D]">
              <p className="text-sm text-[#888899]">
                Ready to start? Drop us a line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-[#22222D]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            <span className="text-white">Cod</span>
            <span className="gradient-text">arti</span>
          </motion.div>
          <p className="text-sm text-[#888899]">
            &copy; {new Date().getFullYear()} Codarti. Build Boldly.
          </p>
          <div className="flex items-center gap-6">
            {["Work", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[#888899] hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0F]">
      <ParticleBackground />
      <CursorGlow />
      <Navigation />
      <Hero />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
