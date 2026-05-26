"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectSchema, type ProjectInput } from "@/lib/validations";
import { toast } from "sonner";

const categories = [
  { value: "web", label: "Web Application" },
  { value: "mobile", label: "Mobile App" },
  { value: "desktop", label: "Desktop App" },
  { value: "api", label: "API / Backend" },
  { value: "other", label: "Other" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
      published: true,
      category: "web",
      images: [],
      techStack: [],
    },
  });

  const featured = watch("featured");
  const published = watch("published");

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setTechStack(newTechStack);
      setValue("techStack", newTechStack);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    const newTechStack = techStack.filter((t) => t !== tech);
    setTechStack(newTechStack);
    setValue("techStack", newTechStack);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In production, this would upload to Cloudinary
    // For now, we'll use placeholder URLs
    const newImages = Array.from(files).map(
      (_, i) => `/images/project-${images.length + i + 1}.jpg`
    );
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    setValue("images", updatedImages);
    toast.success("Images added (demo mode - configure Cloudinary for real uploads)");
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

const onSubmit = async (data: ProjectInput) => {
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        shortDescription: data.description, // مهم
        longDescription: data.longDescription,
        category: data.category,
        technologies: techStack, // مهم
        screenshots: images, // لو API مستني screenshots
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured,
        published: data.published,
      }),
    });

    const result = await res.json();

    console.log(result); // شوف بيرجع ايه

    if (!res.ok) {
      throw new Error(result.error || "Failed to create project");
    }

    toast.success("Project created successfully!");
    router.push("/admin/projects");
    router.refresh();
  } catch (error) {
    console.error(error);
    toast.error("Failed to create project");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Project</h1>
          <p className="text-muted-foreground">Add a new project to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Basic information about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title *
                    </label>
                    <Input
                      id="title"
                      placeholder="My Awesome Project"
                      {...register("title")}
                      aria-invalid={!!errors.title}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Short Description *
                    </label>
                    <Textarea
                      id="description"
                      placeholder="A brief description of your project..."
                      rows={3}
                      {...register("description")}
                      aria-invalid={!!errors.description}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="longDescription"
                      className="text-sm font-medium"
                    >
                      Full Description
                    </label>
                    <Textarea
                      id="longDescription"
                      placeholder="Detailed description of your project..."
                      rows={6}
                      {...register("longDescription")}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>
                    Upload screenshots of your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg border border-border bg-muted"
                      >
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -right-2 -top-2 size-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="size-3" />
                        </Button>
                        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                    <label className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="size-6" />
                        <span className="text-sm">Upload</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {errors.images && (
                    <p className="text-sm text-destructive">
                      {errors.images.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tech Stack</CardTitle>
                  <CardDescription>
                    Technologies used in this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology..."
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTech();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTech}>
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTech(tech)}
                      >
                        {tech}
                        <X className="ml-1 size-3" />
                      </Badge>
                    ))}
                  </div>
                  {errors.techStack && (
                    <p className="text-sm text-destructive">
                      {errors.techStack.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <Select
                      defaultValue="web"
                      onValueChange={(value) =>
                        setValue("category", value as ProjectInput["category"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-xs text-muted-foreground">
                        Show on portfolio
                      </p>
                    </div>
                    <Switch
                      checked={published}
                      onCheckedChange={(checked) =>
                        setValue("published", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Featured</p>
                      <p className="text-xs text-muted-foreground">
                        Highlight this project
                      </p>
                    </div>
                    <Switch
                      checked={featured}
                      onCheckedChange={(checked) =>
                        setValue("featured", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="githubUrl" className="text-sm font-medium">
                      GitHub URL
                    </label>
                    <Input
                      id="githubUrl"
                      placeholder="https://github.com/..."
                      {...register("githubUrl")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="liveUrl" className="text-sm font-medium">
                      Live Demo URL
                    </label>
                    <Input
                      id="liveUrl"
                      placeholder="https://..."
                      {...register("liveUrl")}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
