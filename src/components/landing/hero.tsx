"use client";

import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Users, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-muted/50 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Trusted by 10,000+ active earners
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
              Earn daily income,{" "}
              <span className="text-accent">effortlessly.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Complete simple tasks, earn commissions, and grow your earnings
              with our transparent reward system. Start from $100 and build your
              way to financial freedom.
            </p>

            {/* Key stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  0.45%
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Starting Commission
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  6
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  VIP Levels
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  24/7
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Support
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:gap-3"
              >
                Start Earning Today
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Instant withdrawals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>USDT, ETH, BTC supported</span>
              </div>
            </div>
          </motion.div>

          {/* Right content - Earnings preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="relative bg-card rounded-3xl shadow-2xl border border-border p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-secondary rounded-2xl p-6">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Daily Earnings
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        $847.50
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent text-sm font-medium bg-accent/10 px-3 py-1 rounded-full">
                      <Zap className="h-4 w-4" />
                      LV3 Active
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          Today&apos;s Tasks
                        </span>
                        <span className="text-foreground font-medium">
                          48/60
                        </span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "80%" }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          Sets Completed
                        </span>
                        <span className="text-foreground font-medium">2/3</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "66%" }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recent earnings */}
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Recent Earnings
                    </p>
                    {[
                      { task: "Task Set 2", amount: "+$320.00", time: "2m ago" },
                      {
                        task: "Referral Bonus",
                        amount: "+$150.00",
                        time: "1h ago",
                      },
                      {
                        task: "Task Set 1",
                        amount: "+$377.50",
                        time: "3h ago",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.task}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center justify-between bg-background rounded-xl p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.task}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.time}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-accent">
                          {item.amount}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating referral card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-8 top-1/3 -translate-y-1/2 bg-card rounded-2xl shadow-xl border border-border p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Referral Network
                    </p>
                    <p className="text-xs text-muted-foreground">
                      12 active members
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-accent">$2,450</span>
                  <span className="text-xs text-muted-foreground">earned</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
