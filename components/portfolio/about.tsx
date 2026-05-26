"use client";

import { motion } from "framer-motion";
import { Calendar, Code, Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { StatsCard } from "./stats-card";

const stats = [
  { value: "2+", label: "Years Learning", icon: <Calendar className="size-5" /> },
  { value: "10+", label: "Projects Completed", icon: <Briefcase className="size-5" /> },
  { value: "15+", label: "Technologies", icon: <Code className="size-5" /> },
];

export function About() {
  return (
    <section id="about" className="relative py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeading
          title="About Me"
          subtitle="Get to know more about my journey and passion for technology"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 rounded-2xl border-2 border-primary/20" />
              <div className="absolute -inset-2 rounded-2xl border border-primary/40" />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-xl">
                <div className="aspect-square w-full max-w-md bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20">
                  <Image
                    src="/images/profile-placeholder.jpg"
                    alt="Khaled Abuelenein"
                    width={400}
                    height={400}
                    className="size-full object-cover mix-blend-overlay"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 rounded-xl glass px-4 py-2 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm font-medium">Cairo, Egypt</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                Hello! I&apos;m{" "}
                <span className="gradient-text">Khaled Abuelenein</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A passionate Full Stack Developer with a strong foundation in
                modern web technologies. My journey in software development
                started with curiosity and has evolved into a deep commitment to
                creating impactful digital solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in building responsive, user-friendly applications
                using React, Next.js, Node.js, and various database technologies.
                I&apos;m constantly learning and exploring new technologies to
                stay at the forefront of web development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me exploring new tech
                trends, contributing to open-source projects, or working on
                personal projects that challenge my skills.
              </p>
            </div>

            {/* Tech interests */}
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "PostgreSQL",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
