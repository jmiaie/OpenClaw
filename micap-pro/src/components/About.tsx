"use client";

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Clock } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '20+', icon: Clock },
    { label: 'Proven Reliability', value: '100%', icon: ShieldCheck },
    { label: 'MBA Leadership', value: 'Tier 1', icon: Award },
  ];

  return (
    <section id="about" className="py-24 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-[var(--primary)] uppercase mb-3">About The Founder</h2>
            <h3 className="text-4xl font-extrabold text-[var(--foreground)] mb-6 tracking-tight">
              Jeff Milam, MBA
            </h3>
            <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed">
              With over two decades of experience in Real Estate and Construction, I founded Micap LLC on a simple but increasingly rare principle: doing business with someone who honors their word.
            </p>
            <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed">
              We operate out of Phoenix/Scottsdale, AZ, with practical operations reaching into San Diego, CA. Whether you hold land without the capital to deploy, or you're a builder seeking your next major site, my focus is on ensuring a transparent, reliable, and highly positive client experience from handshake to closing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index}>
                    <Icon className="h-8 w-8 text-[var(--primary)] mb-3" />
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-[var(--muted)]">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--border)] relative shadow-2xl">
              {/* Placeholder for Jeff's Headshot / Action Shot */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background)] to-transparent opacity-50 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Real Estate Construction"
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-[var(--background)] to-transparent">
                <blockquote className="text-xl font-medium text-[var(--foreground)] italic">
                  "Real estate isn't just about land; it's about the reliability of the people standing on it."
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
