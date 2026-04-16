"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[var(--muted)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[var(--border)] px-4 py-2 rounded-full text-sm font-medium text-[var(--foreground)] mb-8"
          >
            <MapPin className="h-4 w-4 text-[var(--primary)]" />
            <span>Phoenix/Scottsdale & San Diego</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--foreground)] mb-6 text-balance"
          >
            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Raw Potential</span> with Visionary Builders.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-[var(--muted)] mb-10 text-balance leading-relaxed"
          >
            Micap LLC brings together sellers of raw land with the contractors, developers, and architects who have the capital and vision to build the future. Reliable. Transparent. We honor our word.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center group">
              I Have Land
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)] rounded-lg font-semibold text-lg transition-all hover:bg-[var(--border)]">
              I Have Capital / Projects
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
