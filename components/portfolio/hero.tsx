"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "./typing-effect";
import { Particles } from "./particles";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/khaledabuelenein", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/khaledabuelenein", icon: Linkedin },
  { name: "Email", href: "mailto:khaledabuelenein@example.com", icon: Mail },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <Particles />

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 size-64 rounded-full bg-primary/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 size-96 rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-4 py-32 text-center"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="mb-4 text-lg text-muted-foreground"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-foreground">Khaled</span>
          <span className="block gradient-text glow-text">Abuelenein</span>
        </motion.h1>

        {/* Role with Typing Effect */}
        <motion.div
          variants={itemVariants}
          className="mb-8 text-xl text-muted-foreground sm:text-2xl md:text-3xl"
        >
          <TypingEffect />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
        >
          Passionate about crafting exceptional digital experiences with modern
          technologies. Specializing in React, Node.js, and full-stack
          development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="group glow-sm min-w-[180px] transition-all hover:glow"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Mail className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5" />
            Get In Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group min-w-[180px] border-primary/50 hover:border-primary hover:bg-primary/10"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex size-12 items-center justify-center rounded-full border border-border bg-card/50 transition-all hover:border-primary hover:bg-primary/10"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          variants={itemVariants}
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Scroll Down</span>
            <ArrowDown className="size-5 text-primary" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
