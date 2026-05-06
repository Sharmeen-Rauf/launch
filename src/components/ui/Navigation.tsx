"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/servicesData";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Packages", href: "/packages" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full p-4 md:p-5 flex justify-between items-center z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_40px_rgba(139,97,194,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center px-4">

        {/* Left: Logo */}
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex items-center justify-center w-9 h-9 relative"
          >
            <span className="absolute inset-0 border-2 border-electric rounded-tl-lg rounded-br-lg"
              style={{ boxShadow: "0 0 12px rgba(139,97,194,0.6)" }}
            />
            <span className="relative z-10 text-electric font-bold text-lg">B</span>
          </motion.div>
          <span className="group-hover:text-electric transition-colors duration-300 uppercase tracking-widest text-white text-sm md:text-base">
            CODE BRECK
          </span>
        </Link>

        {/* Center: Links Pill */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-white bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]">
          {links.map((link) => {
            const isActive = pathname === link.href;

            if (link.name === "Services") {
              return (
                <div key={link.name} className="group relative">
                  <Link
                    href={link.href}
                    className={`relative flex flex-col items-center hover:text-electric transition-colors duration-200 py-4 ${isActive ? "text-electric" : "text-white/80"}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-3 left-0 w-full h-[2px] bg-electric rounded-full"
                        style={{ boxShadow: "0 0 10px rgba(139,97,194,0.9)" }}
                      />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-[1200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-[100]">
                    <div className="w-full bg-[#07070d]/96 backdrop-blur-3xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(139,97,194,0.1)] max-h-[60vh] overflow-y-auto custom-scroll">
                      <style dangerouslySetInnerHTML={{__html: `
                        .custom-scroll::-webkit-scrollbar { width: 4px; }
                        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                        .custom-scroll::-webkit-scrollbar-thumb { background-color: #8b61c2; border-radius: 20px; }
                      `}} />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {servicesData.map((category) => (
                          <div key={category.slug} className="flex flex-col">
                            <Link href={`/services/${category.slug}`} className="text-white font-bold text-lg mb-4 hover:text-electric transition-colors block border-b border-purple-500/20 pb-2">
                              {category.title}
                            </Link>
                            <ul className="flex flex-col gap-3">
                              {category.items.map((subItem, idx) => (
                                <li key={idx} className="flex items-start text-white/60 hover:text-white transition-colors group/item">
                                  <ChevronRight className="w-4 h-4 mr-2 shrink-0 group-hover/item:text-electric transition-colors" />
                                  <span className="text-sm font-medium leading-relaxed">{subItem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex flex-col items-center hover:text-electric transition-colors duration-200 ${isActive ? "text-electric" : "text-white/80"}`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-electric rounded-full"
                    style={{ boxShadow: "0 0 10px rgba(139,97,194,0.9)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:flex group px-6 py-2.5 rounded-full border border-electric/40 bg-electric/10 hover:bg-electric/20 text-white transition-all text-sm font-bold items-center gap-2 hover:shadow-[0_0_25px_rgba(139,97,194,0.4)]"
          >
            Book a call
            <ArrowRight className="w-4 h-4 text-electric group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            className="md:hidden p-2 text-white/80 hover:text-electric transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#07070d]/98 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-electric transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Purple ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full bg-electric/10 blur-[100px]" />
            </div>

            <div className="flex flex-col items-center gap-7 text-2xl font-black tracking-tight relative z-10">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`transition-all duration-200 hover:text-electric ${isActive ? "text-electric text-glow-sm" : "text-white"}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 px-10 py-4 rounded-full bg-electric text-white transition-all text-lg font-bold shadow-[0_0_30px_rgba(139,97,194,0.5)] hover:shadow-[0_0_50px_rgba(139,97,194,0.8)] hover:scale-105"
                >
                  Book a call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
