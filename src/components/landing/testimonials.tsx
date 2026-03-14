"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const testimonials = [
  {
    quote:
      "I started with just $500 and within 3 months I upgraded to LV4. The daily commissions have been life-changing for my family.",
    author: "Michael T.",
    level: "LV4 Member",
    earnings: "$12,400/month",
    rating: 5,
  },
  {
    quote:
      "The referral system is incredible. I've built a network of 50+ members and the passive income keeps growing every day.",
    author: "Sarah K.",
    level: "LV5 Member",
    earnings: "$28,000/month",
    rating: 5,
  },
  {
    quote:
      "Simple interface, reliable payouts, and great customer support. This platform delivers exactly what it promises.",
    author: "David L.",
    level: "LV3 Member",
    earnings: "$6,200/month",
    rating: 5,
  },
];

const stats = [
  { value: "$2.4M+", label: "Paid to members" },
  { value: "10,000+", label: "Active earners" },
  { value: "99.9%", label: "Payout rate" },
  { value: "4.9/5", label: "Member rating" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
            Success Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Real results from real members
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join thousands of members who are already earning daily with Simple
            Money.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-accent">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.level}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent text-sm font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  {testimonial.earnings}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
