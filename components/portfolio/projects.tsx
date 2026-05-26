"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "./section-heading";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

// Sample projects - these would come from the database in production
const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with cart, checkout, and payment integration using Stripe.",
    longDescription:
      "Built a comprehensive e-commerce platform featuring product catalog management, user authentication, shopping cart functionality, and secure checkout with Stripe integration. Includes admin dashboard for inventory management and order tracking.",
    images: ["/images/project-1.jpg"],
    techStack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "web",
    githubUrl: "https://github.com/khaledabuelenein/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "Pharmacy Management System",
    description:
      "Healthcare inventory and prescription management system with real-time stock tracking.",
    longDescription:
      "Developed a pharmacy management system to streamline medication inventory, prescription tracking, and sales management. Features include automated low-stock alerts, expiry date tracking, and customer management.",
    images: ["/images/project-2.jpg"],
    techStack: ["React", "Express.js", "PostgreSQL", "Redis", "Chart.js"],
    category: "web",
    githubUrl: "https://github.com/khaledabuelenein/pharmacy-system",
    featured: true,
  },
  {
    id: "3",
    title: "Shipping & Logistics System",
    description:
      "Track shipments, manage deliveries, and optimize logistics operations in real-time.",
    longDescription:
      "A comprehensive shipping management platform that handles shipment tracking, route optimization, delivery scheduling, and real-time notifications. Includes driver management and analytics dashboard.",
    images: ["/images/project-3.jpg"],
    techStack: ["Next.js", "NestJS", "MongoDB", "Socket.io", "Google Maps API"],
    category: "web",
    githubUrl: "https://github.com/khaledabuelenein/shipping-system",
    liveUrl: "https://shipping-demo.vercel.app",
  },
  {
    id: "4",
    title: "Law Firm Management",
    description:
      "Case management system for law firms with document handling and client portal.",
    longDescription:
      "Built a legal practice management solution featuring case tracking, document management, billing, client communication portal, and court date reminders. Includes role-based access control for security.",
    images: ["/images/project-4.jpg"],
    techStack: ["React", "Node.js", "MySQL", "AWS S3", "DocuSign API"],
    category: "web",
    githubUrl: "https://github.com/khaledabuelenein/law-firm-system",
  },
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Apps" },
  { id: "mobile", name: "Mobile" },
  { id: "api", name: "APIs" },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 size-96 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 size-96 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of my recent work and personal projects"
        />

        {/* Filters */}
        <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category.id && (
                  <motion.span
                    layoutId="activeProjectTab"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <p className="text-muted-foreground">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
