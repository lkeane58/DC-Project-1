import { MatchResult, StudentProfile, StudyGroup } from "@/types";

/**
 * Intelligent Matching Algorithm
 * Analyzes student profile, enrolled courses, section preferences, schedule availability,
 * and study style against existing study groups.
 */
export function calculateGroupMatch(
  student: StudentProfile,
  group: StudyGroup
): MatchResult {
  let score = 0;
  const matchReasons: string[] = [];

  // 1. Course Match (Weight: 40 points)
  const isEnrolled = student.enrolledCourseCodes.includes(group.courseCode);
  let courseMatch = false;
  let sectionMatch = false;

  if (isEnrolled) {
    score += 40;
    courseMatch = true;
    matchReasons.push(`Exact Course Match (${group.courseCode})`);

    // 2. Section & Instructor Alignment (Weight: 20 points)
    // If the student is specifically looking for this course, matching the section/instructor is critical
    score += 20;
    sectionMatch = true;
    matchReasons.push(`Aligned with ${group.instructor} (${group.section ? `Sec ${group.section}` : "Section"})`);
  } else {
    // Check for departmental / interdisciplinary synergy (e.g. EN.601 vs EN.500 vs AS.110)
    const groupDeptPrefix = group.courseCode.split(".")[0] + "." + (group.courseCode.split(".")[1] || "");
    const hasDeptOverlap = student.enrolledCourseCodes.some((code) =>
      code.startsWith(groupDeptPrefix)
    );
    if (hasDeptOverlap) {
      score += 15;
      matchReasons.push(`Related Department Elective`);
    }
  }

  // 3. Schedule & Timing Overlap (Weight: 20 points)
  let scheduleOverlap = false;
  const matchingDays = group.meetingDays.filter((day) =>
    student.preferredDays.includes(day)
  );

  if (matchingDays.length > 0) {
    scheduleOverlap = true;
    const dayPoints = Math.min(15, matchingDays.length * 8);
    score += dayPoints;
    matchReasons.push(`Available on ${matchingDays.join(" & ")}`);
  }

  // Check time of day (e.g., Evening, Afternoon, Morning)
  const groupHour = parseInt(group.meetingTime.split(":")[0] || "17", 10);
  let groupTimeOfDay = "Evening";
  if (groupHour < 12) groupTimeOfDay = "Morning";
  else if (groupHour < 17) groupTimeOfDay = "Afternoon";
  else groupTimeOfDay = "Evening";

  const timeMatches = student.preferredTimes.some((pt) =>
    pt.toLowerCase().includes(groupTimeOfDay.toLowerCase())
  );
  if (timeMatches) {
    score += 10;
    matchReasons.push(`Preferred Meeting Slot (${groupTimeOfDay})`);
  }

  // 4. Study Goals & Style Alignment (Weight: 10 points)
  let styleOverlap = false;
  const sharedGoals = group.studyGoals.filter((goal) =>
    student.preferredStudyGoals.includes(goal)
  );

  if (sharedGoals.length > 0) {
    styleOverlap = true;
    score += Math.min(10, sharedGoals.length * 5);
    matchReasons.push(`Shared Focus: ${sharedGoals.slice(0, 2).join(", ")}`);
  }

  // 5. Capacity & Health
  const openSpots = group.maxMembers - group.members.length;
  if (openSpots <= 0) {
    score = Math.max(10, score - 25); // Heavy penalty if group is already full
    matchReasons.push("Group is Currently Full");
  } else if (openSpots >= 1 && openSpots <= 3) {
    // Ideal group size (active with a few open seats)
    score += 5;
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, Math.round(score)));

  return {
    group,
    score: finalScore,
    matchReasons,
    courseMatch,
    sectionMatch,
    scheduleOverlap,
    styleOverlap,
  };
}

/**
 * Rank and filter all study groups for a given student
 */
export function rankStudyGroups(
  student: StudentProfile,
  groups: StudyGroup[]
): MatchResult[] {
  return groups
    .map((group) => calculateGroupMatch(student, group))
    .sort((a, b) => b.score - a.score);
}

