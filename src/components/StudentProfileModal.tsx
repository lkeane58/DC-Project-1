"use client";

import { StudentProfile } from "@/types";
import { Check, GraduationCap, Sparkles, User, X } from "lucide-react";
import React, { useState } from "react";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_SLOT_OPTIONS = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 5PM)",
  "Evening (5PM - 9PM)",
  "Night (9PM+)",
];

const GOAL_OPTIONS = [
  "Weekly Problem Sets",
  "Midterm & Final Prep",
  "Project Collaboration",
  "Concept Review",
  "Coding & Lab Sprints",
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(student.name);
  const [jhed, setJhed] = useState(student.jhed);
  const [major, setMajor] = useState(student.major);
  const [classYear, setClassYear] = useState(student.classYear);
  const [preferredDays, setPreferredDays] = useState<string[]>(
    student.preferredDays
  );
  const [preferredTimes, setPreferredTimes] = useState<string[]>(
    student.preferredTimes
  );
  const [preferredGoals, setPreferredGoals] = useState<string[]>(
    student.preferredStudyGoals
  );

  if (!isOpen) return null;

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter((d) => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const toggleTime = (time: string) => {
    if (preferredTimes.includes(time)) {
      setPreferredTimes(preferredTimes.filter((t) => t !== time));
    } else {
      setPreferredTimes([...preferredTimes, time]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (preferredGoals.includes(goal)) {
      setPreferredGoals(preferredGoals.filter((g) => g !== goal));
    } else {
      setPreferredGoals([...preferredGoals, goal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...student,
      name: name.trim() || student.name,
      jhed: jhed.trim() || student.jhed,
      email: `${jhed.trim() || student.jhed}@jhu.edu`,
      major: major.trim() || student.major,
      classYear,
      preferredDays: preferredDays.length > 0 ? preferredDays : ["Tuesday"],
      preferredTimes:
        preferredTimes.length > 0 ? preferredTimes : ["Evening (5PM - 9PM)"],
      preferredStudyGoals:
        preferredGoals.length > 0 ? preferredGoals : ["Weekly Problem Sets"],
    };
    onUpdateProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        <div className="bg-gradient-to-r from-jhu-heritage to-jhu-dark p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 mb-1 text-jhu-spirit text-xs font-semibold">
            <User className="w-4 h-4" />
            <span>Hopkins Student Profile & Matching Preferences</span>
          </div>
          <h2 className="text-xl font-bold">Student Profile Settings</h2>
          <p className="text-xs text-slate-300 mt-1">
            Updating your available days, study hours, and academic preferences
            will dynamically adjust your study group compatibility scores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                JHED ID
              </label>
              <input
                type="text"
                value={jhed}
                onChange={(e) => setJhed(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Major / Department
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Class Year
              </label>
              <select
                value={classYear}
                onChange={(e) =>
                  setClassYear(e.target.value as StudentProfile["classYear"])
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
              >
                <option value="First-Year">First-Year (Class of &apos;30)</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Available Study Days (Used by Matching Algorithm)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_DAYS.map((day) => {
                const isSelected = preferredDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-jhu-heritage text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Study Time Windows
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOT_OPTIONS.map((slot) => {
                const isSelected = preferredTimes.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleTime(slot)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-blue-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Study Goals
            </label>
            <div className="flex flex-wrap gap-1.5">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = preferredGoals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-slate-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-jhu-heritage hover:bg-blue-900 text-white text-xs font-bold shadow-md"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

