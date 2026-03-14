"use client";

import { motion } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Simple Task System",
    description:
      "Complete straightforward tasks in organized sets. Each set you finish earns you commissions based on your VIP level.",
  },
  {
    icon: TrendingUp,
    title: "6 VIP Levels",
    description:
      "Progress from LV1 to LV6 and unlock higher commission rates up to 1.5%. Higher levels mean bigger daily earnings.",
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description:
      "Invite friends and earn bonus rewards from their activity. Build your network and multiply your passive income.",
  },
  {
    icon: Clock,
    title: "Daily Salary Bonuses",
    description:
      "Work consistently and unlock salary rewards. Complete 30 consecutive days to earn up to $32,800 in bonuses.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Deposit and withdraw via USDT, ETH, or BTC. All transactions are verified and processed within hours.",
  },
  {
    icon: Wallet,
    title: "Flexible Deposits",
    description:
      "Start with as little as $30. Choose from preset amounts or enter a custom deposit to match your investment goals.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            A transparent system built for earners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to start earning. No hidden fees, no complex
            rules - just complete tasks and watch your balance grow.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* VIP Levels preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-card rounded-3xl border border-border p-8 lg:p-10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              VIP Level Commission Rates
            </h3>
            <p className="text-muted-foreground">
              Higher levels unlock better rates and more daily task sets
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { level: 1, rate: "0.45%", deposit: "$100", color: "#06b6d4" },
              { level: 2, rate: "0.50%", deposit: "$500", color: "#8b5cf6" },
              { level: 3, rate: "0.80%", deposit: "$2,000", color: "#f59e0b" },
              { level: 4, rate: "1.00%", deposit: "$5,000", color: "#ef4444" },
              { level: 5, rate: "1.20%", deposit: "$10,000", color: "#10b981" },
              { level: 6, rate: "1.50%", deposit: "$30,000", color: "#3b82f6" },
            ].map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-secondary rounded-2xl p-4 text-center border border-border hover:border-accent/30 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: tier.color }}
                >
                  LV{tier.level}
                </div>
                <p className="text-xl font-bold text-foreground">{tier.rate}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tier.deposit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
