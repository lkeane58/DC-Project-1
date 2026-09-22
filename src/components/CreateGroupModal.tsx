"use client";

import { JHU_FALL_2026_COURSES } from "@/data/jhuFall2026Courses";
import { PlatformType, StudentProfile, StudyGroup } from "@/types";
import {
  Calendar,
  Clock,
  Link as LinkIcon,
  MapPin,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile;
  onGroupCreated: (newGroup: StudyGroup) => void;
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

const STUDY_GOAL_OPTIONS = [
  "Weekly Problem Sets",
  "Midterm & Final Prep",
  "Project Collaboration",
  "Concept Review",
  "Coding & Lab Sprints",
  "Essay & Reading Discussions",
];

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onGroupCreated,
}) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState(
    currentStudent.enrolledCourseCodes[0] || JHU_FALL_2026_COURSES[0].code
  );
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("01");
  const [instructor, setInstructor] = useState("");

  const [weeklyFrequency, setWeeklyFrequency] = useState<
    "Once a week" | "Twice a week" | "Three times a week" | "Bi-weekly"
  >("Twice a week");
  const [meetingDays, setMeetingDays] = useState<string[]>([
    "Tuesday",
    "Thursday",
  ]);
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("20:00");

  const [preferredLocation, setPreferredLocation] = useState(
    ""
  );
  const [communicationLink, setCommunicationLink] = useState("");
  const [platformName, setPlatformName] = useState<PlatformType>("Discord");
  const [description, setDescription] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Weekly Problem Sets",
    "Midterm & Final Prep",
  ]);
  const [maxMembers, setMaxMembers] = useState(6);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When course changes, update instructor and section default
  useEffect(() => {
    const course = JHU_FALL_2026_COURSES.find(
      (c) => c.code === selectedCourseCode
    );
    if (course && course.sections.length > 0) {
      setInstructor(course.sections[0].instructor);
      setSection(course.sections[0].sectionNumber);
      if (!title) {
        setTitle(`${course.code} Study Squad`);
      }
    }
  }, [selectedCourseCode]);

  if (!isOpen) return null;

  const handleDayToggle = (day: string) => {
    if (meetingDays.includes(day)) {
      if (meetingDays.length > 1) {
        setMeetingDays(meetingDays.filter((d) => d !== day));
      }
    } else {
      setMeetingDays([...meetingDays, day]);
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Group title is required";
    if (!preferredLocation.trim()) newErrors.preferredLocation = "Enter where your group will meet";
    if (!communicationLink.trim()) {
      newErrors.communicationLink = "Communication link is required";
    } else if (!/^https?:\/\//i.test(communicationLink.trim())) {
      newErrors.communicationLink =
        "Must be a valid URL starting with http:// or https://";
    }
    if (meetingDays.length === 0) {
      newErrors.meetingDays = "Select at least one meeting day";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const course = JHU_FALL_2026_COURSES.find(
      (c) => c.code === selectedCourseCode
    );

    const newGroup: StudyGroup = {
      id: `group-${Date.now()}`,
      title: title.trim(),
      courseCode: selectedCourseCode,
      courseTitle: course ? course.title : selectedCourseCode,
      section: section.trim() || "01",
      instructor: instructor.trim() || "Course Faculty",
      meetingDays,
      meetingTime: `${startTime} - ${endTime}`,
      weeklyFrequency,
      preferredLocation: preferredLocation.trim(),
      communicationLink: communicationLink.trim(),
      platformName,
      description:
        description.trim() ||
        `Study group for ${selectedCourseCode} meeting weekly on ${meetingDays.join(
          ", "
        )}.`,
      studyGoals:
        selectedGoals.length > 0 ? selectedGoals : ["Weekly Problem Sets"],
      maxMembers: Number(maxMembers),
      members: [
        {
          id: currentStudent.id,
          name: currentStudent.name,
          email: currentStudent.email,
          jhed: currentStudent.jhed,
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
          role: "creator",
          joinedAt: new Date().toISOString(),
        },
      ],
      createdBy: currentStudent.email,
      createdAt: new Date().toISOString(),
    };

    onGroupCreated(newGroup);
    onClose();
  };

  const currentCourse = JHU_FALL_2026_COURSES.find(
    (c) => c.code === selectedCourseCode
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-jhu-heritage via-blue-900 to-jhu-dark p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1.5 bg-jhu-spirit/20 text-jhu-spirit border border-jhu-spirit/40 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fall 2026 Semester</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Create a New Study Group
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Connect with Hopkins peers taking your Fall 2026 courses. Set up
            your meeting schedule, location, and communication link.
          </p>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Course & Instructor */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-jhu-heritage"></span>
              Course & Academic Details (Fall 2026)
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Course *
              </label>
              <select
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all"
              >
                {JHU_FALL_2026_COURSES.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} — {course.title} ({course.department})
                  </option>
                ))}
              </select>
              {currentCourse && (
                <p className="text-[11px] text-slate-500 mt-1">
                  School: <span className="font-medium text-slate-700">{currentCourse.school}</span> • {currentCourse.credits} Credits
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Instructor Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kai Presler-Marshall"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Section Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01, 02"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Group Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Gateway Python Midterm Grinders"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage transition-all ${
                  errors.title ? "border-rose-400 bg-rose-50/30" : "border-slate-300"
                }`}
              />
              {errors.title && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Section 2: Meeting Timings & Room Location */}
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Meeting schedule & location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Weekly Frequency
                </label>
                <select
                  value={weeklyFrequency}
                  onChange={(e) =>
                    setWeeklyFrequency(
                      e.target.value as "Once a week" | "Twice a week" | "Three times a week" | "Bi-weekly"
                    )
                  }
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                >
                  <option value="Once a week">Once a week</option>
                  <option value="Twice a week">Twice a week</option>
                  <option value="Three times a week">Three times a week</option>
                  <option value="Bi-weekly">Bi-weekly (Every 2 weeks)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Max Group Size
                </label>
                <select
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                >
                  {[3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} Students Max
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Meeting Days Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Meeting Days *
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_DAYS.map((day) => {
                  const isSelected = meetingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
              {errors.meetingDays && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.meetingDays}</p>
              )}
            </div>

            {/* Meeting Times */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>
            </div>

            {/* Creator-entered meeting location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Meeting location *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                type="text"
                placeholder="e.g. Brody Learning Commons, Room 204"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage ${errors.preferredLocation ? "border-rose-400 bg-rose-50/30" : "border-slate-300"}`}
                />
              </div>
              {errors.preferredLocation && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredLocation}</p>}
            </div>
          </div>

          {/* Section 4: Gated Communication Link */}
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Gated Communication Link (1 Link) *
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Protected: This link is revealed strictly AFTER a student joins your group.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Platform
                </label>
                <select
                  value={platformName}
                  onChange={(e) =>
                    setPlatformName(e.target.value as PlatformType)
                  }
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                >
                  <option value="Discord">Discord Server</option>
                  <option value="GroupMe">GroupMe Chat</option>
                  <option value="WhatsApp">WhatsApp Group</option>
                  <option value="Slack">Slack Workspace</option>
                  <option value="Zoom">Zoom Meeting Room</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Other">Other Link</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Invite URL *
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://discord.gg/... or https://groupme.com/..."
                    value={communicationLink}
                    onChange={(e) => setCommunicationLink(e.target.value)}
                    className={`w-full pl-10 pr-3.5 py-2 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage ${
                      errors.communicationLink
                        ? "border-rose-400 bg-rose-50/30"
                        : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.communicationLink && (
                  <p className="text-[11px] text-rose-500 mt-1">
                    {errors.communicationLink}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Study Goals & Description */}
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Group Focus & Description
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Study Goals (Helps Algorithm Match Ideal Students)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {STUDY_GOAL_OPTIONS.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleGoalToggle(goal)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-blue-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Description / Expectations
              </label>
              <textarea
                rows={2}
                placeholder="Share how your study group operates, homework routines, or any guidelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-jhu-heritage hover:bg-blue-900 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Publish Study Group (Fall 2026)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
