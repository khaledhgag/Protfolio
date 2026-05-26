"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Save, Loader2, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aboutSchema, type AboutInput } from "@/lib/validations";
import { toast } from "sonner";

const defaultValues: AboutInput = {
  bio: `A passionate Full Stack Developer with a strong foundation in modern web technologies. My journey in software development started with curiosity and has evolved into a deep commitment to creating impactful digital solutions.

I specialize in building responsive, user-friendly applications using React, Next.js, Node.js, and various database technologies. I'm constantly learning and exploring new technologies to stay at the forefront of web development.

When I'm not coding, you can find me exploring new tech trends, contributing to open-source projects, or working on personal projects that challenge my skills.`,
  shortBio: "Full Stack Developer passionate about creating exceptional digital experiences",
  yearsLearning: 2,
  projectsCompleted: 10,
  technologiesUsed: 15,
  location: "Cairo, Egypt",
  email: "khaledabuelenein@example.com",
  phone: "+20 123 456 7890",
};

export default function AboutPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutInput>({
    resolver: zodResolver(aboutSchema),
    defaultValues,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to Cloudinary
      setProfileImage(URL.createObjectURL(file));
      toast.success("Image selected (configure Cloudinary for real uploads)");
    }
  };

  const onSubmit = async (data: AboutInput) => {
    setIsSaving(true);
    try {
      // In production, this would be an API call
      console.log("About data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("About information saved successfully!");
    } catch {
      toast.error("Failed to save information");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">About</h1>
          <p className="text-muted-foreground">
            Manage your personal information and bio
          </p>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 size-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
                <CardDescription>
                  Upload your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="flex size-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted">
                    {profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="size-full object-cover"
                      />
                    ) : (
                      <User className="size-12 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="mr-2 size-4" />
                      Upload Image
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>
                  Numbers displayed on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Years Learning</label>
                  <Input
                    type="number"
                    {...register("yearsLearning", { valueAsNumber: true })}
                  />
                  {errors.yearsLearning && (
                    <p className="text-sm text-destructive">
                      {errors.yearsLearning.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Projects Completed</label>
                  <Input
                    type="number"
                    {...register("projectsCompleted", { valueAsNumber: true })}
                  />
                  {errors.projectsCompleted && (
                    <p className="text-sm text-destructive">
                      {errors.projectsCompleted.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Technologies Used</label>
                  <Input
                    type="number"
                    {...register("technologiesUsed", { valueAsNumber: true })}
                  />
                  {errors.technologiesUsed && (
                    <p className="text-sm text-destructive">
                      {errors.technologiesUsed.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
              <CardDescription>
                Tell visitors about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Bio</label>
                <Input
                  placeholder="A brief one-liner about yourself..."
                  {...register("shortBio")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Bio *</label>
                <Textarea
                  placeholder="Tell your story..."
                  rows={8}
                  {...register("bio")}
                  aria-invalid={!!errors.bio}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How visitors can reach you
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="City, Country"
                  {...register("location")}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
}
