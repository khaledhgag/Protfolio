"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: align === "center" ? 100 : 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-4 h-1 rounded-full bg-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
