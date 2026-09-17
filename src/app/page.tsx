"use client";

import { CourseSelector } from "@/components/CourseSelector";
import { CreateGroupModal } from "@/components/CreateGroupModal";
import { Navbar } from "@/components/Navbar";
import { StudentProfileModal } from "@/components/StudentProfileModal";
import { StudyGroupCard } from "@/components/StudyGroupCard";
import { rankStudyGroups } from "@/lib/matching";
import { getStoredGroups, getStoredProfile, saveGroups, saveProfile } from "@/lib/storage";
import { StudentProfile, StudyGroup } from "@/types";
import { AlertCircle, BookOpen, Calendar, Compass, Filter, GraduationCap, PlusCircle, Search, Sparkles, Users } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"match" | "explore" | "my-groups">("match");

  // Main state
  const [student, setStudent] = useState<StudentProfile>(getStoredProfile());
  const [groups, setGroups] = useState<StudyGroup[]>(getStoredGroups());

  // Search & Filter state for Explore tab
  const [exploreSearch, setExploreSearch] = useState("");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setGroups(getStoredGroups());
    setStudent(getStoredProfile());
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Toggle course in student's enrolled courses list
  const handleToggleCourse = (courseCode: string) => {
    const updatedCodes = student.enrolledCourseCodes.includes(courseCode)
      ? student.enrolledCourseCodes.filter((c) => c !== courseCode)
      : [...student.enrolledCourseCodes, courseCode];

    const updatedProfile: StudentProfile = {
      ...student,
      enrolledCourseCodes: updatedCodes,
    };
    setStudent(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleClearAllCourses = () => {
    const updatedProfile: StudentProfile = {
      ...student,
      enrolledCourseCodes: [],
    };
    setStudent(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudent(updated);
    saveProfile(updated);
    showNotification("Student profile & schedule preferences updated!");
  };

  // Join a public group (1-click)
  const handleJoinPublic = (group: StudyGroup) => {
    if (group.members.some((m) => m.email === student.email)) return;
    if (group.members.length >= group.maxMembers) {
      showNotification("This study group is already at full capacity.");
      return;
    }

    const updatedMembers = [
      ...group.members,
      {
        id: student.id,
        name: student.name,
        email: student.email,
        jhed: student.jhed,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        role: "member" as const,
        joinedAt: new Date().toISOString(),
      },
    ];

    const updatedGroups = groups.map((g) =>
      g.id === group.id ? { ...g, members: updatedMembers } : g
    );

    setGroups(updatedGroups);
    saveGroups(updatedGroups);
    showNotification(
      `Joined "${group.title}"! The ${group.platformName} communication link is now unlocked.`
    );
  };

  // Leave a study group
  const handleLeaveGroup = (groupId: string) => {
    const updatedGroups = groups.map((g) => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        members: g.members.filter(
          (m) => m.email !== student.email && m.jhed !== student.jhed
        ),
      };
    });
    setGroups(updatedGroups);
    saveGroups(updatedGroups);
    showNotification("You have left the study group.");
  };

  // Add a newly created group
  const handleGroupCreated = (newGroup: StudyGroup) => {
    const updated = [newGroup, ...groups];
    setGroups(updated);
    saveGroups(updated);
    showNotification(
      `Created study group for ${newGroup.courseCode}! Your communication link is live.`
    );
  };

  // Groups student has joined
  const myGroups = useMemo(() => {
    return groups.filter((g) =>
      g.members.some((m) => m.email === student.email || m.jhed === student.jhed)
    );
  }, [groups, student]);

  // Matched groups sorted by algorithm
  const rankedMatches = useMemo(() => {
    return rankStudyGroups(student, groups);
  }, [student, groups]);

  // Filtered groups for the Explore tab (public only)
  const filteredExploreGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch =
        group.title.toLowerCase().includes(exploreSearch.toLowerCase()) ||
        group.courseCode.toLowerCase().includes(exploreSearch.toLowerCase()) ||
        group.courseTitle.toLowerCase().includes(exploreSearch.toLowerCase()) ||
        group.instructor.toLowerCase().includes(exploreSearch.toLowerCase()) ||
        group.description.toLowerCase().includes(exploreSearch.toLowerCase());
      return matchesSearch;
    });
  }, [groups, exploreSearch]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-jhu-spirit shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myGroupsCount={myGroups.length}
        myBookingsCount={0}
        student={student}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: SMART MATCH */}
        {activeTab === "match" && (
          <div className="space-y-6">
            {/* Course Selection Section */}
            <CourseSelector
              selectedCourseCodes={student.enrolledCourseCodes}
              onToggleCourse={handleToggleCourse}
              onClearAll={handleClearAllCourses}
            />

            {/* Matching Engine Results Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Intelligent Study Group Matches
                  </h2>
                  <span className="bg-jhu-heritage text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {rankedMatches.length} Evaluated
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algorithm scored based on your enrolled Fall 2026 courses,
                  instructor alignment, meeting times, and study objectives.
                </p>
              </div>

              <button
                onClick={() => setIsProfileOpen(true)}
                className="text-xs font-semibold text-jhu-heritage hover:underline flex items-center space-x-1 self-start sm:self-auto"
              >
                <span>Edit Schedule & Preferences</span>
              </button>
            </div>

            {/* Grid of Matched Study Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rankedMatches.map((match) => (
                <StudyGroupCard
                  key={match.group.id}
                  group={match.group}
                  currentStudent={student}
                  matchResult={match}
                  onJoinPublic={handleJoinPublic}
                  onLeaveGroup={handleLeaveGroup}
                />
              ))}
            </div>

            {rankedMatches.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  No Study Groups Found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                  Be the pioneer for your class! Create the very first study
                  group for your Fall 2026 courses and invite your classmates.
                </p>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="inline-flex items-center space-x-1.5 bg-jhu-heritage text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Study Group</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE / ALL STUDY GROUPS */}
        {activeTab === "explore" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  All JHU Fall 2026 Study Groups
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Browse all active student cohorts across the Whiting School
                  and Krieger School.
                </p>
              </div>

              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search groups, courses, or profs..."
                    value={exploreSearch}
                    onChange={(e) => setExploreSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                  />
                </div>
              </div>
            </div>

            {/* Grid of Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExploreGroups.map((group) => {
                const matchResult = rankedMatches.find(
                  (m) => m.group.id === group.id
                );
                return (
                  <StudyGroupCard
                    key={group.id}
                    group={group}
                    currentStudent={student}
                    matchResult={matchResult}
                    onJoinPublic={handleJoinPublic}
                    onLeaveGroup={handleLeaveGroup}
                  />
                );
              })}
            </div>

            {filteredExploreGroups.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-700 font-semibold text-sm">
                  No groups match your search criteria.
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Try clearing your search term or adjusting filters.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY GROUPS */}
        {activeTab === "my-groups" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  My Active Study Groups ({myGroups.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  All communication links (Discord, GroupMe, WhatsApp, Slack,
                  Zoom) are fully unlocked for your active groups.
                </p>
              </div>

              <button
                onClick={() => setIsCreateOpen(true)}
                className="inline-flex items-center space-x-1.5 bg-jhu-heritage text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs hover:bg-blue-900 transition-all self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Group</span>
              </button>
            </div>

            {myGroups.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  You Haven\'t Joined Any Groups Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Check out the Smart Match tab to find groups that match your
                  Fall 2026 courses, or browse all public listings.
                </p>
                <button
                  onClick={() => setActiveTab("match")}
                  className="inline-flex items-center space-x-1.5 bg-jhu-heritage text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
                >
                  <Compass className="w-4 h-4 text-jhu-spir" />
                  <span>Go to Smart Match</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {myGroups.map((group) => {
                  const matchResult = rankedMatches.find(
                    (m) => m.group.id === group.id
                  );
                  return (
                    <StudyGroupCard
                      key={group.id}
                      group={group}
                      currentStudent={student}
                      matchResult={matchResult}
                      onJoinPublic={handleJoinPublic}
                      onLeaveGroup={handleLeaveGroup}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-jhu-heritage" />
            <span className="font-semibold text-slate-200">
              Johns Hopkins University Study Group & Room Booking
            </span>
            <span className="text-slate-600">|</span>
            <span>Fall 2026 Term</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            <span>
              Connected to JHU Public Course Catalog (Fall 2026) & Brody Learning Commons
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        currentStudent={student}
        onGroupCreated={handleGroupCreated}
      />

      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        student={student}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
