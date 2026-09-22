"use client";

import { StudentProfile } from "@/types";
import { BookOpen, Compass, GraduationCap, Plus, Users } from "lucide-react";
import React from "react";

interface NavbarProps {
  activeTab: "match" | "explore" | "my-groups";
  setActiveTab: (tab: "match" | "explore" | "my-groups") => void;
  myGroupsCount: number;
  student: StudentProfile;
  onOpenCreate: () => void;
  onOpenProfile: () => void;
}

const navigation = [
  { id: "match" as const, label: "My courses", icon: Compass },
  { id: "explore" as const, label: "Discover groups", icon: BookOpen },
  { id: "my-groups" as const, label: "My groups", icon: Users },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myGroupsCount,
  student,
  onOpenCreate,
  onOpenProfile,
}) => (
  <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        <button onClick={() => setActiveTab("match")} className="flex shrink-0 items-center gap-2.5 text-left" aria-label="Go to My courses">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-jhu-heritage text-white shadow-sm">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-jhu-heritage">Johns Hopkins University</span>
            <span className="block text-base font-bold tracking-tight text-slate-950">Hopkins Study</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-xl bg-slate-100 p-1 md:flex" aria-label="Primary navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${activeTab === id ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
              {id === "my-groups" && myGroupsCount > 0 && <span className="rounded-full bg-jhu-heritage px-1.5 py-px text-[10px] text-white">{myGroupsCount}</span>}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onOpenCreate} className="inline-flex items-center gap-1.5 rounded-xl bg-jhu-heritage px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-jhu-dark">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Create group</span>
            <span className="sm:hidden">Create</span>
          </button>
          <button onClick={onOpenProfile} className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 bg-slate-50 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-white" aria-label="Edit your profile" title="Edit profile">
            {student.name.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
      <nav className="-mx-1 flex gap-1 overflow-x-auto pb-2 md:hidden" aria-label="Mobile navigation">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${activeTab === id ? "bg-slate-900 text-white" : "text-slate-600"}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}
          </button>
        ))}
      </nav>
    </div>
  </header>
);
