"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
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
import { settingsSchema, type SettingsInput } from "@/lib/validations";
import { toast } from "sonner";

const defaultValues: SettingsInput = {
  siteName: "Khaled Abuelenein - Full Stack Developer",
  siteDescription:
    "Professional portfolio of Khaled Abuelenein - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  siteKeywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  accentColor: "#6366f1",
  socialLinks: {
    github: "https://github.com/khaledabuelenein",
    linkedin: "https://linkedin.com/in/khaledabuelenein",
    twitter: "https://twitter.com/khaledabuelenein",
    email: "khaledabuelenein@example.com",
  },
};

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [keywords, setKeywords] = useState<string[]>(defaultValues.siteKeywords || []);
  const [keywordInput, setKeywordInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const onSubmit = async (data: SettingsInput) => {
    setIsSaving(true);
    try {
      // In production, this would be an API call
      console.log("Settings data:", { ...data, siteKeywords: keywords });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your portfolio settings and SEO
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
        {/* SEO Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your portfolio for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name *</label>
                <Input
                  placeholder="Your Name - Developer"
                  {...register("siteName")}
                  aria-invalid={!!errors.siteName}
                />
                {errors.siteName && (
                  <p className="text-sm text-destructive">
                    {errors.siteName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Site Description</label>
                <Textarea
                  placeholder="A brief description of your portfolio..."
                  rows={3}
                  {...register("siteDescription")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Keywords</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keyword..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                  />
                  <Button type="button" onClick={addKeyword}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 text-muted-foreground hover:text-destructive"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub</label>
                <Input
                  placeholder="https://github.com/username"
                  {...register("socialLinks.github")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn</label>
                <Input
                  placeholder="https://linkedin.com/in/username"
                  {...register("socialLinks.linkedin")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter</label>
                <Input
                  placeholder="https://twitter.com/username"
                  {...register("socialLinks.twitter")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register("socialLinks.email")}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Environment Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Environment Setup</CardTitle>
              <CardDescription>
                Required environment variables for full functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <p className="text-muted-foreground"># MongoDB Connection</p>
                <p>MONGODB_URI=mongodb+srv://...</p>
                <br />
                <p className="text-muted-foreground"># NextAuth</p>
                <p>NEXTAUTH_SECRET=your-secret-key</p>
                <p>NEXTAUTH_URL=http://localhost:3000</p>
                <br />
                <p className="text-muted-foreground"># Cloudinary</p>
                <p>CLOUDINARY_CLOUD_NAME=your-cloud</p>
                <p>CLOUDINARY_API_KEY=your-key</p>
                <p>CLOUDINARY_API_SECRET=your-secret</p>
                <br />
                <p className="text-muted-foreground"># Admin Credentials</p>
                <p>ADMIN_EMAIL=admin@example.com</p>
                <p>ADMIN_PASSWORD=your-password</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Add these to your <code className="text-primary">.env.local</code> file or Vercel project settings.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
}
