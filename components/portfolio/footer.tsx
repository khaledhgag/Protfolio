"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/khaledabuelenein", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/khaledabuelenein", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/khaledabuelenein", icon: Twitter },
  { name: "Email", href: "mailto:khaledabuelenein@example.com", icon: Mail },
];

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">
              Khaled Abuelenein
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Full Stack Developer passionate about creating exceptional digital
              experiences with modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className="size-10 hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <link.icon className="size-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground sm:flex-row"
        >
          <p>
            &copy; {currentYear} Khaled Abuelenein. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="size-4 text-red-500" fill="currentColor" /> using Next.js & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
