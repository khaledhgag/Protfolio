"use client";

import { motion } from "framer-motion";
import { FolderKanban, Wrench, Mail, Eye, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  {
    title: "Total Projects",
    value: "4",
    change: "+2 this month",
    icon: FolderKanban,
    href: "/admin/projects",
  },
  {
    title: "Skills",
    value: "15+",
    change: "Across 5 categories",
    icon: Wrench,
    href: "/admin/skills",
  },
  {
    title: "Messages",
    value: "0",
    change: "0 unread",
    icon: Mail,
    href: "/admin/messages",
  },
  {
    title: "Portfolio Views",
    value: "---",
    change: "Connect analytics",
    icon: Eye,
    href: "/admin/settings",
  },
];

const quickActions = [
  { name: "Add New Project", href: "/admin/projects/new", icon: FolderKanban },
  { name: "Manage Skills", href: "/admin/skills", icon: Wrench },
  { name: "View Messages", href: "/admin/messages", icon: Mail },
  { name: "Edit About", href: "/admin/about", icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="size-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Commonly used actions to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-auto flex-col gap-2 py-4"
                  asChild
                >
                  <Link href={action.href}>
                    <action.icon className="size-6" />
                    <span>{action.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity & Tips */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Complete these steps to set up your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-medium">Configure Environment</p>
                  <p className="text-sm text-muted-foreground">
                    Set up MongoDB and Cloudinary credentials
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/settings">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-medium">Update Your About Info</p>
                  <p className="text-sm text-muted-foreground">
                    Add your bio and profile image
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/about">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div className="flex-1">
                  <p className="font-medium">Add Your Projects</p>
                  <p className="text-sm text-muted-foreground">
                    Showcase your best work
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/projects/new">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle>View Your Portfolio</CardTitle>
              <CardDescription>
                See how your portfolio looks to visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center">
              <div className="rounded-lg bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20 p-8 text-center">
                <h3 className="mb-2 text-xl font-semibold">
                  Khaled Abuelenein
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Full Stack Developer
                </p>
                <Button asChild>
                  <Link href="/" target="_blank">
                    <Eye className="mr-2 size-4" />
                    View Live Site
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
