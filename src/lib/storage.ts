import { INITIAL_CAMPUS_ROOMS, INITIAL_STUDY_GROUPS } from "@/data/initialData";
import { CampusRoom, RoomBooking, StudentProfile, StudyGroup } from "@/types";

const GROUPS_STORAGE_KEY = "jhu_study_groups_v1";
const PROFILE_STORAGE_KEY = "jhu_student_profile_v1";
const BOOKINGS_STORAGE_KEY = "jhu_room_bookings_v1";

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

export function getStoredBookings(): RoomBooking[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!stored) {
    const initialBookings: RoomBooking[] = [
      {
        id: "book-1",
        roomId: "blc-2012",
        roomName: "BLC Study Room 2012",
        building: "Brody Learning Commons",
        bookedBy: "achen44@jhu.edu",
        groupId: "group-python-pm",
        groupTitle: "Gateway Python Problem Solvers",
        date: "2026-09-22",
        startTime: "18:00",
        endTime: "20:00",
        purpose: "Weekly Python Section 02 Problem Set Session",
        createdAt: "2026-09-01T10:00:00Z",
      },
      {
        id: "book-2",
        roomId: "malone-216",
        roomName: "Malone CS Collaboration 216",
        building: "Malone Hall",
        bookedBy: "dzhang19@jhu.edu",
        groupId: "group-datastruct-froehlich",
        groupTitle: "Data Structures Hardcore Grinders",
        date: "2026-09-23",
        startTime: "19:00",
        endTime: "21:00",
        purpose: "Data Structures Balanced Trees Implementation Sprint",
        createdAt: "2026-09-02T16:00:00Z",
      },
    ];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(initialBookings));
    return initialBookings;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: RoomBooking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

/**
 * Generate a clean, secure access code for private groups
 * e.g., "JHU-9K4W" or "HOPKINS-8M2P"
 */
export function generateGroupPasscode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `JHU-${randomPart}`;
}

export const CAMPUS_ROOMS: CampusRoom[] = INITIAL_CAMPUS_ROOMS;

