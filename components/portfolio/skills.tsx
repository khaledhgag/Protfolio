"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { SkillBar } from "./skill-bar";
import { cn } from "@/lib/utils";

interface Skill {
  _id: string;
  name: string;
  percentage: number;
  category: "frontend" | "backend" | "database" | "devops" | "data" | "other";
  icon?: string;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data: Skill[] = await res.json();

      const categorized = [
        { id: "frontend", name: "Frontend" },
        { id: "backend", name: "Backend" },
        { id: "database", name: "Database" },
        { id: "devops", name: "DevOps" },
        { id: "data", name: "Data & AI" },
      ].map((cat) => ({
        ...cat,
        skills: data.filter((skill) => skill.category === cat.id),
      }));

      setSkillCategories(categorized);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                {isLoading ? (
                  <div className="py-8 text-center text-muted-foreground">
                    Loading skills...
                  </div>
                ) : currentCategory?.skills && currentCategory.skills.length > 0 ? (
                  currentCategory.skills.map((skill, index) => (
                    <SkillBar
                      key={skill._id}
                      name={skill.name}
                      percentage={skill.percentage}
                      delay={index * 0.05}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No skills in this category yet
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
