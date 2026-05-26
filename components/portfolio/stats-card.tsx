"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatsCard({ value, label, icon, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="glass border-border/50 transition-all hover:border-primary/50">
        <CardContent className="flex flex-col items-center p-6 text-center">
          {icon && (
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <motion.span
            className="text-3xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {value}
          </motion.span>
          <span className="mt-1 text-sm text-muted-foreground">{label}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
