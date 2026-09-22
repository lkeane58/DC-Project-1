"use client";

import { JHU_FALL_2026_COURSES } from "@/data/jhuFall2026Courses";
import { Check, ChevronDown, Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";

interface CourseSelectorProps {
  selectedCourseCodes: string[];
  onToggleCourse: (courseCode: string) => void;
  onClearAll: () => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ selectedCourseCodes, onToggleCourse, onClearAll }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(24);

  const departments = useMemo(() => ["All", ...Array.from(new Set(JHU_FALL_2026_COURSES.map((course) => course.department)))], []);
  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return JHU_FALL_2026_COURSES.filter((course) =>
      (departmentFilter === "All" || course.department === departmentFilter) &&
      (!query || course.code.toLowerCase().includes(query) || course.title.toLowerCase().includes(query))
    );
  }, [departmentFilter, searchQuery]);
  const selectedCourses = useMemo(() => JHU_FALL_2026_COURSES.filter((course) => selectedCourseCodes.includes(course.code)), [selectedCourseCodes]);
  const visibleCourses = filteredCourses.slice(0, visibleCount);

  const resetResults = () => setVisibleCount(24);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]" aria-labelledby="course-selector-heading">
      <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-5 sm:px-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-jhu-heritage">Step 1 · Your courses</p>
            <h1 id="course-selector-heading" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Build your study list</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Add the courses you plan to take. We use them to surface relevant groups when classmates begin creating them.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <span className="block text-2xl font-bold tabular-nums text-slate-950">{selectedCourseCodes.length}</span>
            <span className="text-xs font-medium text-slate-500">courses selected</span>
          </div>
        </div>
        {selectedCourses.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
            {selectedCourses.map((course) => (
              <button key={course.code} onClick={() => onToggleCourse(course.code)} className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-left text-xs font-semibold text-blue-950 hover:bg-blue-100" title={`Remove ${course.code}`}>
                <span className="font-mono text-[11px]">{course.code}</span><span className="max-w-[180px] truncate font-medium">{course.title}</span><X className="h-3.5 w-3.5 shrink-0" />
              </button>
            ))}
            <button onClick={onClearAll} className="ml-1 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline">Clear list</button>
          </div>
        )}
      </div>

      <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search course catalogue</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); resetResults(); }} placeholder="Search by course number or title" className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400" />
            {searchQuery && <button onClick={() => { setSearchQuery(""); resetResults(); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Clear search"><X className="h-4 w-4" /></button>}
          </label>
          <label className="relative sm:w-56">
            <span className="sr-only">Filter by subject</span>
            <select value={departmentFilter} onChange={(event) => { setDepartmentFilter(event.target.value); resetResults(); }} className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700">
              {departments.map((department) => <option key={department} value={department}>{department === "All" ? "All subjects" : department}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500"><span className="font-semibold text-slate-700">{filteredCourses.length.toLocaleString()}</span> published catalogue courses · live section availability is confirmed in SIS</p>
      </div>

      <div className="p-3 sm:p-5">
        {visibleCourses.length > 0 ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => {
            const isSelected = selectedCourseCodes.includes(course.code);
            return <button key={course.code} onClick={() => onToggleCourse(course.code)} aria-pressed={isSelected} className={`group flex min-h-[90px] items-start gap-3 rounded-xl border p-3.5 text-left transition ${isSelected ? "border-jhu-heritage bg-blue-50" : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"}`}>
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${isSelected ? "border-jhu-heritage bg-jhu-heritage text-white" : "border-slate-300 text-transparent group-hover:border-slate-400"}`}><Check className="h-3.5 w-3.5 stroke-[3]" /></span>
              <span className="min-w-0"><span className="block font-mono text-[11px] font-bold text-jhu-heritage">{course.code}</span><span className="mt-1 block line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{course.title}</span><span className="mt-1 block text-xs text-slate-500">{course.department}</span></span>
            </button>;
          })}
        </div> : <div className="py-12 text-center"><Search className="mx-auto h-7 w-7 text-slate-300" /><p className="mt-3 text-sm font-semibold text-slate-800">No courses found</p><p className="mt-1 text-sm text-slate-500">Try a course number, a different title, or another subject.</p></div>}
        {visibleCourses.length < filteredCourses.length && <div className="pt-5 text-center"><button onClick={() => setVisibleCount((count) => count + 24)} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Show more courses</button></div>}
      </div>
    </section>
  );
};
