export interface CourseSection {
  sectionNumber: string;
  instructor: string;
  days: string[];
  times: string;
  location: string;
}

export interface JHUCourse {
  id: string;
  code: string;
  title: string;
  department: string;
  school: "Whiting School of Engineering" | "Krieger School of Arts and Sciences" | "Carey Business School" | "School of Education";
  term: "Fall 2026";
  credits: number;
  sections: CourseSection[];
  description: string;
  level: "Undergraduate" | "Graduate" | "First-Year Seminar";
}

export type PlatformType =
  | "Discord"
  | "GroupMe"
  | "WhatsApp"
  | "Slack"
  | "Zoom"
  | "Google Meet"
  | "Other";

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  jhed: string;
  avatar: string;
  role: "creator" | "member";
  joinedAt: string;
}

export interface StudyGroup {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  section: string;
  instructor: string;
  meetingDays: string[];
  meetingTime: string; // e.g. "18:00 - 20:00"
  weeklyFrequency: "Once a week" | "Twice a week" | "Three times a week" | "Bi-weekly";
  preferredLocation: string;


  description: string;
  studyGoals: string[];
  maxMembers: number;
  members: GroupMember[];
  createdBy: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  jhed: string;
  major: string;
  classYear: "First-Year" | "Sophomore" | "Junior" | "Senior" | "Graduate";
  enrolledCourseCodes: string[];
  preferredDays: string[];
  preferredTimes: string[]; // e.g. "Morning (8AM - 12PM)", "Afternoon (12PM - 5PM)", "Evening (5PM - 9PM)", "Night (9PM+)"
  preferredStudyGoals: string[];
}

export interface MatchResult {
  group: StudyGroup;
  score: number; // 0 - 100
  matchReasons: string[];
  courseMatch: boolean;
  sectionMatch: boolean;
  scheduleOverlap: boolean;
  styleOverlap: boolean;
}

export interface CampusRoom {
  id: string;
  name: string;
  building: "Brody Learning Commons" | "Milton S. Eisenhower Library" | "Malone Hall" | "Hackerman Hall" | "Levering Hall";
  floor: string;
  capacity: number;
  amenities: string[];
  imageUrl?: string;
}

export interface RoomBooking {
  id: string;
  roomId: string;
  roomName: string;
  building: string;
  bookedBy: string;
  groupId?: string;
  groupTitle?: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  createdAt: string;
}
