"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Upload, X, Plus, Loader2, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { projectSchema, type ProjectFormData } from "@/lib/validations"

const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "Other"]

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [techInput, setTechInput] = useState("")
  const [technologies, setTechnologies] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  const featured = watch("featured")
  const status = watch("status")

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (res.ok) {
          const project = await res.json()
          setValue("title", project.title)
          setValue("shortDescription", project.shortDescription)
          setValue("longDescription", project.longDescription)
          setValue("category", project.category)
          setValue("technologies", project.technologies)
          setValue("liveUrl", project.liveUrl || "")
          setValue("githubUrl", project.githubUrl || "")
          setValue("featured", project.featured)
          setValue("status", project.status)
          setValue("order", project.order)
          setTechnologies(project.technologies)
          if (project.thumbnail) setThumbnailPreview(project.thumbnail)
          if (project.screenshots) setScreenshots(project.screenshots)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProject()
  }, [params.id, setValue])

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "thumbnails")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setThumbnailPreview(data.url)
        setValue("thumbnail", data.url)
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "screenshots")

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          setScreenshots((prev) => [...prev, data.url])
        }
      } catch (error) {
        console.error("Upload error:", error)
      }
    }
  }

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index))
  }

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      const newTech = [...technologies, techInput.trim()]
      setTechnologies(newTech)
      setValue("technologies", newTech)
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    const newTech = technologies.filter((t) => t !== tech)
    setTechnologies(newTech)
    setValue("technologies", newTech)
  }

  const onSubmit = async (data: ProjectFormData) => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          thumbnail: thumbnailPreview,
          screenshots,
        }),
      })

      if (res.ok) {
        router.push("/admin/projects")
      }
    } catch (error) {
      console.error("Error updating project:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground">Update project details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/projects/${params.id}`} target="_blank">
              <Eye className="mr-2 size-4" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  {...register("shortDescription")}
                  rows={2}
                  className={errors.shortDescription ? "border-destructive" : ""}
                />
                {errors.shortDescription && (
                  <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Full Description</Label>
                <Textarea
                  id="longDescription"
                  {...register("longDescription")}
                  rows={6}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={watch("category")}
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => setValue("status", value as "published" | "draft" | "archived")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology (e.g., React, Node.js)"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology}>
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1 pr-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live Demo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="liveUrl"
                    type="url"
                    placeholder="https://example.com"
                    {...register("liveUrl")}
                  />
                  {watch("liveUrl") && (
                    <Button type="button" variant="outline" size="icon" asChild>
                      <a href={watch("liveUrl")} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="githubUrl"
                    type="url"
                    placeholder="https://github.com/username/repo"
                    {...register("githubUrl")}
                  />
                  {watch("githubUrl") && (
                    <Button type="button" variant="outline" size="icon" asChild>
                      <a href={watch("githubUrl")} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {thumbnailPreview ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview(null)
                        setValue("thumbnail", "")
                      }}
                      className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
                    <Upload className="mb-2 size-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload thumbnail</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Screenshots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                        className="absolute right-1 top-1 rounded-full bg-destructive p-0.5 text-white"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 transition-colors hover:border-primary/50">
                  <Plus className="size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Add screenshots</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleScreenshotUpload}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured Project</Label>
                  <p className="text-sm text-muted-foreground">Show on homepage</p>
                </div>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setValue("featured", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min="0"
                  {...register("order", { valueAsNumber: true })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </motion.div>
  )
}
