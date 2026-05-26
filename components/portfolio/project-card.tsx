"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Project {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  techStack: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "group cursor-pointer overflow-hidden border-border/50 transition-all duration-300",
            "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
            project.featured && "border-primary/30"
          )}
          onClick={() => setIsModalOpen(true)}
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.images[0] || "/images/project-placeholder.jpg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent",
                "transition-opacity duration-300",
                isHovered ? "opacity-90" : "opacity-70"
              )}
            />

            {/* Featured Badge */}
            {project.featured && (
              <Badge className="absolute left-3 top-3 bg-primary/90">
                Featured
              </Badge>
            )}

            {/* Hover Overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              {project.githubUrl && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank");
                  }}
                >
                  <Github className="size-5" />
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  size="icon"
                  className="size-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank");
                  }}
                >
                  <ExternalLink className="size-5" />
                </Button>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <CardContent className="p-5">
            <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
          </DialogHeader>

          {/* Image Carousel */}
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={
                project.images[currentImageIndex] ||
                "/images/project-placeholder.jpg"
              }
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            {project.images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="size-5" />
                </Button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "size-2 rounded-full transition-colors",
                        idx === currentImageIndex
                          ? "bg-primary"
                          : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            {project.longDescription && (
              <p className="text-muted-foreground">{project.longDescription}</p>
            )}

            <div>
              <h4 className="mb-2 font-semibold">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 size-4" />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
