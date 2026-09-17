import { INITIAL_CAMPUS_ROOMS, INITIAL_STUDY_GROUPS } from "@/data/initialData";
import { CampusRoom, RoomBooking, StudentProfile, StudyGroup } from "@/types";

const GROUPS_STORAGE_KEY = "jhu_study_groups_v1";
const PROFILE_STORAGE_KEY = "jhu_student_profile_v1";

export const DEFAULT_STUDENT: StudentProfile = {
  id: "usr-jordan-lee",
  name: "Jordan Lee",
  email: "jlee102@jhu.edu",
  jhed: "jlee102",
  major: "Computer Science & Applied Mathematics",
  classYear: "First-Year",
  enrolledCourseCodes: ["EN.500.113", "AS.110.109", "AS.171.101", "AS.001.128"],
  preferredDays: ["Tuesday", "Thursday", "Sunday"],
  preferredTimes: ["Evening (5PM - 9PM)", "Night (9PM+)"],
  preferredStudyGoals: ["Weekly Problem Sets", "Midterm & Final Prep", "Project Collaboration"],
};

export function getStoredGroups(): StudyGroup[] {
  if (typeof window === "undefined") return INITIAL_STUDY_GROUPS;
  const stored = localStorage.getItem(GROUPS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(INITIAL_STUDY_GROUPS));
    return INITIAL_STUDY_GROUPS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_STUDY_GROUPS;
  }
}

export function saveGroups(groups: StudyGroup[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
}

export function getStoredProfile(): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_STUDENT;
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENT));
    return DEFAULT_STUDENT;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export const CAMPUS_ROOMS: CampusRoom[] = INITIAL_CAMPUS_ROOMS;

