"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "devops", name: "DevOps" },
  { id: "data", name: "Data & AI" },
  { id: "other", name: "Other" },
];

const initialSkills = {
  frontend: [
    { name: "HTML5 / CSS3", percentage: 95 },
    { name: "JavaScript (ES6+)", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "React.js", percentage: 90 },
    { name: "Next.js", percentage: 85 },
    { name: "Tailwind CSS", percentage: 90 },
  ],
  backend: [
    { name: "Node.js", percentage: 85 },
    { name: "Express.js", percentage: 85 },
    { name: "NestJS", percentage: 75 },
    { name: "Python", percentage: 70 },
  ],
  database: [
    { name: "MongoDB", percentage: 85 },
    { name: "PostgreSQL", percentage: 80 },
    { name: "MySQL", percentage: 80 },
    { name: "Redis", percentage: 70 },
  ],
  devops: [
    { name: "Git / GitHub", percentage: 90 },
    { name: "Docker", percentage: 75 },
    { name: "AWS Basics", percentage: 65 },
    { name: "Vercel / Netlify", percentage: 85 },
  ],
  data: [
    { name: "Data Analysis", percentage: 70 },
    { name: "Machine Learning Basics", percentage: 60 },
    { name: "Pandas / NumPy", percentage: 65 },
  ],
  other: [],
};

type SkillCategory = keyof typeof initialSkills;

export default function SkillsPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend");
  const [newSkillName, setNewSkillName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const currentSkills = skills[activeCategory] || [];

  const updateSkillPercentage = (index: number, percentage: number) => {
    const updated = { ...skills };
    updated[activeCategory][index].percentage = percentage;
    setSkills(updated);
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const updated = { ...skills };
    updated[activeCategory] = [
      ...updated[activeCategory],
      { name: newSkillName.trim(), percentage: 50 },
    ];
    setSkills(updated);
    setNewSkillName("");
    toast.success("Skill added");
  };

  const removeSkill = (index: number) => {
    const updated = { ...skills };
    updated[activeCategory] = updated[activeCategory].filter((_, i) => i !== index);
    setSkills(updated);
    toast.success("Skill removed");
  };

  const saveSkills = async () => {
    setIsSaving(true);

    try {
      // Convert from category-based structure to flat array
      const skillsArray = Object.entries(skills).flatMap(
        ([category, categorySkills]) =>
          categorySkills.map((skill, order) => ({
            ...skill,
            category,
            order,
          }))
      );

      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: skillsArray }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save skills");
      }

      toast.success("Skills saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save skills");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">
            Manage your skills and expertise
          </p>
        </div>
        <Button onClick={saveSkills} disabled={isSaving}>
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

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.id as SkillCategory)}
          >
            {cat.name}
            <Badge variant="secondary" className="ml-2">
              {skills[cat.id as SkillCategory]?.length || 0}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Skills List */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{activeCategory} Skills</CardTitle>
            <CardDescription>
              Adjust skill percentages or add new skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Skill */}
            <div className="flex gap-2">
              <Input
                placeholder="Add new skill..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button onClick={addSkill}>
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Skills List */}
            {currentSkills.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No skills in this category yet. Add one above!
              </p>
            ) : (
              <div className="space-y-6">
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${skill.name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-right text-sm text-muted-foreground">
                          {skill.percentage}%
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <Slider
                      value={[skill.percentage]}
                      onValueChange={(value) =>
                        updateSkillPercentage(index, value[0])
                      }
                      max={100}
                      step={5}
                      className="cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
