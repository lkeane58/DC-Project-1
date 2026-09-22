import { StudentProfile, StudyGroup } from "@/types";

// v2 deliberately starts empty; it prevents any retired demonstration groups
// and their links from being carried into the live experience.
const GROUPS_STORAGE_KEY = "jhu_study_groups_v2";
const PROFILE_STORAGE_KEY = "jhu_student_profile_v2";

export const DEFAULT_STUDENT: StudentProfile = {
  id: "current-student",
  name: "Student",
  email: "student@jhu.edu",
  jhed: "student",
  major: "",
  classYear: "First-Year",
  enrolledCourseCodes: [],
  preferredDays: [],
  preferredTimes: [],
  preferredStudyGoals: [],
};

export function getStoredGroups(): StudyGroup[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(GROUPS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
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

