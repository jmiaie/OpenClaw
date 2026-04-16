"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      content: "Jeff didn't just find a buyer for our family's unused acreage; he found a developer whose vision respected the surrounding community. He did exactly what he said he would do, when he said he would do it.",
      author: "Sarah J.",
      role: "Land Seller, Arizona",
      rating: 5
    },
    {
      content: "As a commercial builder, finding off-market raw land that fits our strict zoning and capital requirements is incredibly tough. Micap LLC brought us a fully vetted parcel and made the contract process seamless.",
      author: "Marcus T.",
      role: "Managing Partner, T-Build Development",
      rating: 5
    },
    {
      content: "Reliability is everything in this industry. Jeff's 20 years of construction experience means he actually understands what developers need before he even pitches the land. A true professional.",
      author: "David L.",
      role: "Principal Architect, San Diego",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[var(--border)]/30 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-[var(--primary)] uppercase mb-3"
          >
            Client Success
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight"
          >
            A Reputation Built on Trust
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--background)] p-8 rounded-2xl shadow-sm border border-[var(--border)]"
            >
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[var(--primary)] fill-current" />
                ))}
              </div>
              <p className="text-[var(--foreground)] text-lg mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-bold text-[var(--foreground)]">{testimonial.author}</div>
                <div className="text-sm text-[var(--muted)]">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
