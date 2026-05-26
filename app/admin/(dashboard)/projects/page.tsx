"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Sample data - in production this would come from the database
const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "web",
    featured: true,
    published: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Pharmacy Management System",
    category: "web",
    featured: true,
    published: true,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Shipping & Logistics System",
    category: "web",
    featured: false,
    published: true,
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    title: "Law Firm Management",
    category: "web",
    featured: false,
    published: true,
    createdAt: "2024-01-01",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(sampleProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      // In production, this would be an API call
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    } catch {
      toast.error("Failed to delete project");
    }
    setDeleteId(null);
  };

  const toggleFeatured = async (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      )
    );
    toast.success("Project updated");
  };

  const togglePublished = async (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, published: !p.published } : p
      )
    );
    toast.success("Project updated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 size-4" />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={project.published ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => togglePublished(project.id)}
                    >
                      {project.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(project.id)}
                    >
                      <Star
                        className={`size-4 ${
                          project.featured
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/${project.id}`}>
                            <Pencil className="mr-2 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/#projects`} target="_blank">
                            <Eye className="mr-2 size-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(project.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
