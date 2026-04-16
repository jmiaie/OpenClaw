"use client";

import { motion } from 'framer-motion';
import { Map, Pickaxe, Handshake, Building2 } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Raw Land Acquisition",
      description: "We work directly with owners of unused or inherited land who lack the capital or desire to develop it themselves, offering fair, transparent pathways to liquidity.",
      icon: Map,
    },
    {
      title: "Developer & Builder Matching",
      description: "Connecting prime undeveloped parcels with top-tier contractors, developers, and architects actively seeking suitable projects for their capital.",
      icon: Pickaxe,
    },
    {
      title: "Deal Structuring & Contracts",
      description: "Operating seamlessly across Arizona and California, we provide the necessary legal frameworks and structural oversight to protect all parties.",
      icon: Handshake,
    },
    {
      title: "Construction Management Synergy",
      description: "Leveraging 20+ years of construction experience to ensure land attributes perfectly match the builder's vision and zoning requirements.",
      icon: Building2,
    },
  ];

  return (
    <section id="services" className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-[var(--primary)] uppercase mb-3"
          >
            How We Work
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4"
          >
            The Marketplace for Builders & Landowners
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--muted)]"
          >
            We eliminate the friction between raw potential and final execution by pairing the right land with the right capital.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--primary)] transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 bg-[var(--border)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/10 transition-colors">
                  <Icon className="h-7 w-7 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors" />
                </div>
                <h4 className="text-2xl font-bold text-[var(--foreground)] mb-3">{service.title}</h4>
                <p className="text-[var(--muted)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
