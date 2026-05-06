"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useSceneContext } from "@/context/SceneContext";
import Link from "next/link";
import CounterSection from "@/components/ui/CounterSection";
import AboutSection from "@/components/ui/AboutSection";
import ServicesSection from "@/components/ui/ServicesSection";
import WhyChooseSection from "@/components/ui/WhyChooseSection";
import VideoSection from "@/components/ui/VideoSection";
import ProcessSection from "@/components/ui/ProcessSection";
import TrustSection from "@/components/ui/TrustSection";
import TestimonialSection from "@/components/ui/TestimonialSection";
import FAQSection from "@/components/ui/FAQSection";
import ContactSection from "@/components/ui/ContactSection";
import BlogSection from "@/components/ui/BlogSection";
import GlobalImpactSection from "@/components/ui/GlobalImpactSection";
import FooterSection from "@/components/ui/FooterSection";

const heroWords = ["NEXT GEN", "FUTURE", "DIGITAL"];

export default function Home() {
  const { setSection } = useSceneContext();
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollYProgress } = useScroll();

  // Cycle hero words
  useEffect(() => {
    const t = setInterval(() => setWordIdx((p) => (p + 1) % heroWords.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Update 3D scene based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      let current = 0;
      if (latest < 0.25) current = 0;
      else if (latest >= 0.25 && latest < 0.75) current = 1;
      else current = 2;
      setSection(current);
    });
  }, [scrollYProgress, setSection]);

  useEffect(() => {
    setSection(0);
  }, [setSection]);

  return (
    <main className="relative w-full">
      <div className="w-full relative z-10">

        {/* ─── Hero Section ─── */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative pt-20 overflow-hidden">

          {/* Purple ambient blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,97,194,0.15) 0%, transparent 70%)" }}
            />
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(168,125,224,0.1) 0%, transparent 70%)" }}
            />
          </div>

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border border-electric/30 bg-electric/8 text-electric text-sm font-semibold tracking-wider"
            style={{ boxShadow: "0 0 20px rgba(139,97,194,0.2)" }}
          >
            <Sparkles className="w-4 h-4" />
            Engineering the Future
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 leading-[0.95]">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-electric inline-block text-glow"
              >
                {heroWords[wordIdx]}
              </motion.span>
              <br />
              <span className="text-white">AGENCIES.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-white/55 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              A global software house delivering cutting-edge AI, scalable cloud infrastructure, and enterprise platforms that redefine industries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/services"
                className="group px-8 py-4 bg-electric text-white rounded-full font-bold text-lg hover:bg-electricLight hover:shadow-[0_0_40px_rgba(139,97,194,0.6)] transition-all flex items-center gap-3"
                style={{ boxShadow: "0 0 25px rgba(139,97,194,0.4)" }}
              >
                Explore Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:border-electric/50 hover:text-electric hover:shadow-[0_0_20px_rgba(139,97,194,0.2)] transition-all flex items-center gap-3"
              >
                Book a Call
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 flex flex-col items-center gap-1 text-white/30"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </section>

        <CounterSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <VideoSection />
        <ProcessSection />
        <TrustSection />
        <TestimonialSection />
        <FAQSection />
        <ContactSection />
        <BlogSection />
        <GlobalImpactSection />
        <FooterSection />

      </div>
    </main>
  );
}
