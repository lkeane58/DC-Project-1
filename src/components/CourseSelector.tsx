"use client";

import { JHU_FALL_2026_COURSES } from "@/data/jhuFall2026Courses";
import { BookOpen, Check, Filter, Search, Sparkles, X } from "lucide-react";
import React, { useMemo, useState } from "react";

interface CourseSelectorProps {
  selectedCourseCodes: string[];
  onToggleCourse: (courseCode: string) => void;
  onSelectAllSuggested?: () => void;
  onClearAll: () => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  selectedCourseCodes,
  onToggleCourse,
  onClearAll,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(48);

  const departments = useMemo(() => {
    const deps = new Set(JHU_FALL_2026_COURSES.map((c) => c.department));
    return ["All", ...Array.from(deps)];
  }, []);

  const filteredCourses = useMemo(() => {
    return JHU_FALL_2026_COURSES.filter((course) => {
      const matchesSearch =
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.sections.some((sec) =>
          sec.instructor.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesDept =
        departmentFilter === "All" || course.department === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, departmentFilter]);

  const visibleCourses = useMemo(
    () => filteredCourses.slice(0, visibleCount),
    [filteredCourses, visibleCount]
  );

  const selectedCourses = useMemo(() => {
    return JHU_FALL_2026_COURSES.filter((c) =>
      selectedCourseCodes.includes(c.code)
    );
  }, [selectedCourseCodes]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-jhu-heritage via-blue-900 to-jhu-dark p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-jhu-spirit/20 border border-jhu-spirit/40 px-2.5 py-1 rounded-full text-xs font-semibold text-jhu-spirit mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fall 2026 Course Schedule Selector</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Select Your Fall 2026 Courses
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Search the complete published JHU 2026–27 catalogue and add the
              courses you plan to take. SIS remains the authority for live
              Fall section availability.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3.5 text-center min-w-[160px] self-start md:self-auto">
            <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold block">
              Enrolled Courses
            </span>
            <div className="text-2xl font-black text-jhu-spirit mt-0.5">
              {selectedCourseCodes.length}
            </div>
            <span className="text-[11px] text-slate-200">
              Selected for Matching
            </span>
          </div>
        </div>

        {/* Selected Courses Chips */}
        {selectedCourses.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Your Fall 2026 Course List:
              </span>
              <button
                onClick={onClearAll}
                className="text-xs text-rose-300 hover:text-rose-200 underline font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCourses.map((c) => (
                <span
                  key={c.code}
                  className="inline-flex items-center bg-white/15 hover:bg-white/25 text-white border border-white/25 rounded-lg pl-3 pr-2 py-1 text-xs font-medium shadow-sm transition-all"
                >
                  <span className="font-bold text-jhu-spirit mr-1.5">
                    {c.code}
                  </span>
                  <span className="max-w-[180px] sm:max-w-[260px] truncate mr-1.5">
                    {c.title}
                  </span>
                  <button
                    onClick={() => onToggleCourse(c.code)}
                    className="p-0.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                    title="Remove course"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Course Search & Filter Bar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Fall 2026 courses by code (e.g. EN.500.113, EN.601.226), title, or instructor..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(48); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
            <select
              value={departmentFilter}
              onChange={(e) => { setDepartmentFilter(e.target.value); setVisibleCount(48); }}
              className="px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all shadow-sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="p-5 max-h-[420px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {visibleCourses.map((course) => {
            const isSelected = selectedCourseCodes.includes(course.code);
            return (
              <div
                key={course.code}
                onClick={() => onToggleCourse(course.code)}
                className={`cursor-pointer rounded-xl p-4 border transition-all relative text-left flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50/70 border-jhu-heritage/40 shadow-sm ring-1 ring-jhu-heritage/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-jhu-heritage text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {course.code}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-jhu-heritage text-white"
                          : "border border-slate-300 text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1 line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                    {course.department}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                  <span className="text-slate-500">
                    Catalogue listing
                  </span>
                  <span className="font-medium text-slate-700 truncate max-w-[140px]">
                    {course.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 font-medium text-sm">
              No Fall 2026 courses match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Try searching by course code like &ldquo;EN.500.113&rdquo; or instructor name.
            </p>
          </div>
        )}

        {visibleCourses.length < filteredCourses.length && (
          <div className="pt-5 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 48)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-jhu-heritage hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-jhu-heritage/30"
            >
              Show 48 more of {filteredCourses.length.toLocaleString()} courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
