"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Code, Briefcase } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { StatsCard } from "./stats-card";

interface AboutData {
  bio: string;
  shortBio?: string;
  profileImage?: string;
  yearsLearning: number;
  projectsCompleted: number;
  technologiesUsed: number;
  location?: string;
}

export function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      setAboutData(data);
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultStats = [
    { value: "2+", label: "Years Learning", icon: <Calendar className="size-5" /> },
    { value: "10+", label: "Projects Completed", icon: <Briefcase className="size-5" /> },
    { value: "15+", label: "Technologies", icon: <Code className="size-5" /> },
  ];

  const stats = aboutData
    ? [
        {
          value: `${aboutData.yearsLearning}+`,
          label: "Years Learning",
          icon: <Calendar className="size-5" />,
        },
        {
          value: `${aboutData.projectsCompleted}+`,
          label: "Projects Completed",
          icon: <Briefcase className="size-5" />,
        },
        {
          value: `${aboutData.technologiesUsed}+`,
          label: "Technologies",
          icon: <Code className="size-5" />,
        },
      ]
    : defaultStats;

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
                    src={aboutData?.profileImage || "/images/profile-placeholder.jpg"}
                    alt="Profile"
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
                  <span className="text-sm font-medium">
                    {aboutData?.location || "Cairo, Egypt"}
                  </span>
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
              {isLoading ? (
                <div className="space-y-2 py-4">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutData?.bio ||
                      "A passionate Full Stack Developer with a strong foundation in modern web technologies."}
                  </p>
                  {aboutData?.shortBio && (
                    <p className="text-muted-foreground leading-relaxed">
                      {aboutData.shortBio}
                    </p>
                  )}
                </>
              )}
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
