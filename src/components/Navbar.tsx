"use client";

import { StudentProfile } from "@/types";
import {
  BookOpen,
  Calendar,
  Compass,
  GraduationCap,
  PlusCircle,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import React from "react";

interface NavbarProps {
  activeTab: "match" | "explore" | "my-groups" | "rooms";
  setActiveTab: (tab: "match" | "explore" | "my-groups" | "rooms") => void;
  myGroupsCount: number;
  myBookingsCount: number;
  student: StudentProfile;
  onOpenCreate: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myGroupsCount,
  myBookingsCount,
  student,
  onOpenCreate,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-jhu-heritage text-white border-b border-jhu-dark/50 shadow-md">
      {/* Top University Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs text-slate-200">
          <div className="flex items-center space-x-2">
            <span className="font-serif tracking-widest font-semibold text-white uppercase text-[11px]">
              Johns Hopkins University
            </span>
            <span className="text-white/40">|</span>
            <span className="text-jhu-spirit font-medium">
              Academic Communities & Student Life
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Fall 2026 Semester Active
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Homewood Campus
            </span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-jhu-spirit to-blue-600 flex items-center justify-center text-white shadow-inner font-bold text-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
                  Hopkins<span className="text-jhu-spirit">Study</span>
                </span>
                <span className="bg-jhu-spirit/20 text-jhu-spirit border border-jhu-spirit/30 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                  Fall &apos;26
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Course Study Groups & Study Room Reservations
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("match")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "match"
                  ? "bg-white/15 text-white shadow-sm font-semibold border border-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Compass className="w-4 h-4 text-jhu-spirit" />
              <span>Smart Match</span>
            </button>

            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "explore"
                  ? "bg-white/15 text-white shadow-sm font-semibold border border-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="w-4 h-4 text-jhu-spirit" />
              <span>Browse All Groups</span>
            </button>

            <button
              onClick={() => setActiveTab("my-groups")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === "my-groups"
                  ? "bg-white/15 text-white shadow-sm font-semibold border border-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Users className="w-4 h-4 text-jhu-spirit" />
              <span>My Groups</span>
              {myGroupsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-jhu-spirit text-jhu-dark text-[10px] font-bold rounded-full">
                  {myGroupsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === "rooms"
                  ? "bg-white/15 text-white shadow-sm font-semibold border border-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Calendar className="w-4 h-4 text-jhu-spirit" />
              <span>Campus Rooms</span>
              {myBookingsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-400 text-slate-900 text-[10px] font-bold rounded-full">
                  {myBookingsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Actions: Create Group CTA & Profile */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenCreate}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-jhu-spirit to-sky-400 hover:from-sky-400 hover:to-sky-300 text-jhu-dark font-semibold px-3.5 py-2 rounded-lg text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-jhu-dark" />
              <span className="hidden sm:inline">Create Group</span>
              <span className="sm:hidden">Create</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-1.5 rounded-lg text-xs text-white transition-colors text-left"
              title="Click to switch student profile / course schedule"
            >
              <div className="w-7 h-7 rounded-full bg-jhu-spirit text-jhu-dark flex items-center justify-center font-bold text-xs">
                {student.name.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="font-semibold leading-tight">{student.name}</p>
                <p className="text-[10px] text-jhu-spirit">{student.jhed}@jhu.edu</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden border-t border-white/10 py-2 space-x-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("match")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "match" ? "bg-white/20 font-bold" : "text-slate-300"
            }`}
          >
            Smart Match
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "explore" ? "bg-white/20 font-bold" : "text-slate-300"
            }`}
          >
            Browse All
          </button>
          <button
            onClick={() => setActiveTab("my-groups")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "my-groups" ? "bg-white/20 font-bold" : "text-slate-300"
            }`}
          >
            My Groups ({myGroupsCount})
          </button>
          <button
            onClick={() => setActiveTab("rooms")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "rooms" ? "bg-white/20 font-bold" : "text-slate-300"
            }`}
          >
            Rooms ({myBookingsCount})
          </button>
        </div>
      </div>
    </header>
  );
};
