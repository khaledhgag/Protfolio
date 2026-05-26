"use client";

import { create } from "zustand";

interface PortfolioState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
  skillCategory: string;
  setSkillCategory: (category: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
  theme: "dark",
  setTheme: (theme) => set({ theme }),
  projectFilter: "all",
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  skillCategory: "frontend",
  setSkillCategory: (category) => set({ skillCategory: category }),
}));
