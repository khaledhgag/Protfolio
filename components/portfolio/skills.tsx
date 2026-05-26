"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { SkillBar } from "./skill-bar";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "HTML5 / CSS3", percentage: 95 },
      { name: "JavaScript (ES6+)", percentage: 90 },
      { name: "TypeScript", percentage: 85 },
      { name: "React.js", percentage: 90 },
      { name: "Next.js", percentage: 85 },
      { name: "Tailwind CSS", percentage: 90 },
      { name: "Redux / Zustand", percentage: 80 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", percentage: 85 },
      { name: "Express.js", percentage: 85 },
      { name: "NestJS", percentage: 75 },
      { name: "Python", percentage: 70 },
      { name: "RESTful APIs", percentage: 90 },
      { name: "GraphQL", percentage: 70 },
    ],
  },
  {
    id: "database",
    name: "Database",
    skills: [
      { name: "MongoDB", percentage: 85 },
      { name: "PostgreSQL", percentage: 80 },
      { name: "MySQL", percentage: 80 },
      { name: "Redis", percentage: 70 },
      { name: "Prisma ORM", percentage: 75 },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    skills: [
      { name: "Git / GitHub", percentage: 90 },
      { name: "Docker", percentage: 75 },
      { name: "AWS Basics", percentage: 65 },
      { name: "Vercel / Netlify", percentage: 85 },
      { name: "CI/CD", percentage: 70 },
    ],
  },
  {
    id: "data",
    name: "Data & AI",
    skills: [
      { name: "Data Analysis", percentage: 70 },
      { name: "Machine Learning Basics", percentage: 60 },
      { name: "Pandas / NumPy", percentage: 65 },
      { name: "Data Visualization", percentage: 70 },
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const currentCategory = skillCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <section id="skills" className="relative py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/2 size-96 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "relative rounded-full px-6 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category.id && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            <div className="rounded-2xl glass p-8">
              <div className="space-y-6">
                {currentCategory?.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <h3 className="mb-6 text-lg font-semibold">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Figma",
              "Jest",
              "Cypress",
              "Socket.io",
              "Stripe",
              "Firebase",
              "Supabase",
              "Linux",
              "Agile/Scrum",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/50"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
