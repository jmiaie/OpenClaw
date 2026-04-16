"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [inquiryType, setInquiryType] = useState('land');

  return (
    <section id="contact" className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-[var(--primary)] uppercase mb-3">Get in Touch</h2>
            <h3 className="text-4xl font-extrabold text-[var(--foreground)] mb-6 tracking-tight">
              Let's build the future together.
            </h3>
            <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed max-w-lg">
              Whether you have raw land ready to sell or you're a developer seeking your next project, reach out. We honor our word and value your time.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--border)] p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--foreground)]">Headquarters</h4>
                  <p className="text-[var(--muted)]">Phoenix / Scottsdale, AZ</p>
                  <p className="text-sm text-[var(--muted)] mt-1">Operating in AZ & San Diego, CA</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[var(--border)] p-3 rounded-full">
                  <Mail className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--foreground)]">Email Us</h4>
                  <p className="text-[var(--muted)]">jeff@micap.pro</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[var(--border)] p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--foreground)]">Call Us</h4>
                  <p className="text-[var(--muted)]">Available upon request</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--border)]/30 rounded-3xl p-8 border border-[var(--border)] shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setInquiryType('land')}
                  className={`py-3 rounded-xl text-sm font-semibold transition-colors ${
                    inquiryType === 'land'
                      ? 'bg-[var(--primary)] text-white shadow-md'
                      : 'bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)]'
                  }`}
                >
                  I Have Land
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('capital')}
                  className={`py-3 rounded-xl text-sm font-semibold transition-colors ${
                    inquiryType === 'capital'
                      ? 'bg-[var(--primary)] text-white shadow-md'
                      : 'bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)]'
                  }`}
                >
                  I Am A Builder
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-[var(--foreground)]">First Name</label>
                  <input type="text" id="firstName" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-[var(--foreground)]">Last Name</label>
                  <input type="text" id="lastName" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">Email Address</label>
                <input type="email" id="email" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">
                  {inquiryType === 'land' ? 'Tell us about your land (Location, Acreage, etc.)' : 'Tell us about your project needs'}
                </label>
                <textarea id="message" rows={4} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] resize-none" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-white rounded-lg px-6 py-4 font-bold text-lg transition-all flex justify-center items-center group">
                Send Inquiry
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
