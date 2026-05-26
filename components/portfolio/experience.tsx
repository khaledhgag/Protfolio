"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: 1,
    type: "education",
    title: "Full Stack Web Development",
    organization: "Route Academy",
    location: "Cairo, Egypt",
    period: "2023 - 2024",
    description:
      "Intensive full-stack development bootcamp covering modern web technologies, best practices, and real-world project development.",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    link: "https://routeacademy.com",
  },
  {
    id: 2,
    type: "education",
    title: "Advanced Software Development",
    organization: "AMIT Learning",
    location: "Cairo, Egypt",
    period: "2022 - 2023",
    description:
      "Comprehensive program in software development fundamentals, algorithms, data structures, and professional development practices.",
    skills: ["Python", "JavaScript", "Data Structures", "Algorithms", "OOP"],
    link: "https://amit-learning.com",
  },
  {
    id: 3,
    type: "certification",
    title: "Data Analysis Professional",
    organization: "Online Platform",
    location: "Remote",
    period: "2023",
    description:
      "Professional certification in data analysis, covering statistical methods, data visualization, and business intelligence.",
    skills: ["Python", "Pandas", "Data Visualization", "SQL", "Statistics"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 size-96 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeading
          title="Education & Training"
          subtitle="My learning journey and professional development"
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-8 pl-20 md:w-1/2 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-6 top-6 flex size-4 items-center justify-center rounded-full border-2 border-primary bg-background md:left-auto ${
                  index % 2 === 0 ? "md:right-[-8px]" : "md:left-[-8px]"
                }`}
              >
                <div className="size-2 rounded-full bg-primary" />
              </div>

              <Card className="overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <GraduationCap className="size-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {exp.type === "education" ? "Education" : "Certification"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {exp.organization}
                      </span>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="size-3" />
                          Visit
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-muted-foreground">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
