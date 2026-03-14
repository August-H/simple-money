"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Start with just $30",
  "Withdraw anytime",
  "24/7 customer support",
  "Multi-crypto support",
];

export function CTA() {
  return (
    <section
      id="signup"
      className="py-24 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/90 mb-6"
          >
            <Zap className="h-4 w-4" />
            Join 10,000+ active earners
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Ready to start earning?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/70 text-pretty max-w-2xl mx-auto">
            Create your account in minutes and start completing tasks today.
            Your first commission is just a few clicks away.
          </p>

          {/* Benefits */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 text-sm text-primary-foreground/80"
              >
                <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="h-3 w-3 text-accent-foreground" />
                </div>
                {benefit}
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-foreground hover:bg-accent/90 transition-all hover:gap-3"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Sign In to Dashboard
            </Link>
          </motion.div>

          {/* Trust note */}
          <p className="mt-8 text-sm text-primary-foreground/50">
            Secure registration. No credit card required.
          </p>
        </motion.div>

        {/* Quick start steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Sign up with your email and set up your profile in under 2 minutes.",
            },
            {
              step: "02",
              title: "Make a Deposit",
              desc: "Fund your account with USDT, ETH, or BTC. Start from just $30.",
            },
            {
              step: "03",
              title: "Start Earning",
              desc: "Complete daily tasks, earn commissions, and withdraw your profits.",
            },
          ].map((item, i) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-foreground/10 text-primary-foreground font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-primary-foreground/60">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
